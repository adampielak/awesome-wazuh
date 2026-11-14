import { describe, expect, test } from "bun:test";
import { safeName, isPublicHost, isOffensive, cleanDescription, insertionLine, listedRepos, route } from "./update";

const repo = (full_name: string, description: string, topics: string[] = []) =>
  ({ full_name, description, topics, html_url: `https://github.com/${full_name}`, stargazers_count: 10, pushed_at: "", archived: false, fork: false, owner: { login: full_name.split("/")[0] } });

describe("cleanDescription", () => {
  test("normalizes case, emoji, dashes and final period", () => {
    expect(cleanDescription("🛡️ wazuh rules for fortigate \u2014 and more")).toBe("Wazuh rules for fortigate - and more.");
  });
  test("rejects empty, short and non-Latin text", () => {
    expect(cleanDescription(null)).toBeNull();
    expect(cleanDescription("wazuh")).toBeNull();
    expect(cleanDescription("基于Wazuh的安全监控平台部署脚本和配置")).toBeNull();
  });
  test("strips markdown and HTML control characters", () => {
    expect(cleanDescription("Use [this] <b>tool</b> with Wazuh")).toBe("Use this btool/b with Wazuh.");
  });
});

describe("route", () => {
  test("vendor decoders go to Vendor-Specific Rules", () => {
    expect(route(repo("a/wazuh-mikrotik-decoder", "Wazuh decoder for MikroTik RouterOS logs"))).toBe("### Vendor-Specific Rules");
  });
  test("generic rules go to Community Rules", () => {
    expect(route(repo("a/rules", "Custom Wazuh rules and decoders"))).toBe("### Community Rules");
  });
  test("labs win over the tools they use", () => {
    expect(route(repo("a/soc-home-lab", "SOC home lab with Wazuh, Docker and TheHive"))).toBe("### Labs");
  });
  test("MCP servers go to AI & MCP", () => {
    expect(route(repo("a/wazuh-mcp", "MCP server for the Wazuh API"))).toBe("### AI & MCP");
  });
  test("fallback is Utilities", () => {
    expect(route(repo("a/go-wazuh", "Go client for the Wazuh API"))).toBe("### Utilities");
  });
});

describe("README helpers", () => {
  const md = ["## A", "", "### Docker", "", "- [x](https://github.com/o/x) - X.", "- [y](https://github.com/o/Y.git) - Y.", "", "### Kubernetes", "", "Intro.", "", "## B"];
  test("insertion point is the last item of the section", () => {
    expect(insertionLine(md, "### Docker")).toBe(5);
  });
  test("empty section inserts after the intro paragraph", () => {
    expect(insertionLine(md, "### Kubernetes")).toBe(9);
  });
  test("missing heading returns -1", () => {
    expect(insertionLine(md, "### Nope")).toBe(-1);
  });
  test("listed repos are lowercased and ignore non-repo paths", () => {
    expect([...listedRepos(md.join("\n") + "\n[t](https://github.com/topics/wazuh)")]).toEqual(["o/x", "o/y"]);
  });
});

describe("discovery filters", () => {
  test("Portuguese and Spanish descriptions are rejected", () => {
    expect(cleanDescription("Projeto de SOC na nuvem com Wazuh para monitoramento de uma rede")).toBeNull();
    expect(cleanDescription("Inventario de equipos con Wazuh para la gestión de los activos")).toBeNull();
  });
  test("English description survives the language check", () => {
    expect(cleanDescription("Ansible role for the Wazuh agent")).toBe("Ansible role for the Wazuh agent.");
  });
  test("long descriptions are cut at a sentence boundary", () => {
    const d = cleanDescription("Wazuh decoders for MikroTik RouterOS logs. " + "Includes rules for firewall, DHCP and VPN events and dashboards for all of them ".repeat(3));
    expect(d).toBe("Wazuh decoders for MikroTik RouterOS logs.");
  });
  test("long single sentence is cut at a word with an ellipsis", () => {
    const d = cleanDescription("Wazuh " + "integration with many things ".repeat(10))!;
    expect(d.length).toBeLessThanOrEqual(164);
    expect(d.endsWith("...")).toBe(true);
  });
  test("offensive tooling is skipped unless it is detection content", () => {
    expect(isOffensive("Process injection loader that evades Wazuh")).toBe(true);
    expect(isOffensive("PoC exploit for CVE-2026-25769 RCE in Wazuh")).toBe(true);
    expect(isOffensive("Wazuh rules to detect process injection")).toBe(false);
    expect(isOffensive("Wazuh dashboard for agents")).toBe(false);
  });
});

describe("description edge cases", () => {
  test("version numbers do not split sentences", () => {
    const d = cleanDescription("A Python tool that parses EVTX files and converts them into JSON formatted logs mimicking Wazuh agent behavior in version 4.x. wazuhevtx is designed as a helper for wazuh-logtest tool.");
    expect(d).toBe("A Python tool that parses EVTX files and converts them into JSON formatted logs mimicking Wazuh agent behavior in version 4.x.");
  });
  test("a list of tags is rejected", () => {
    expect(cleanDescription("wazuh  azure  security-operations  siem  mistral  llm  hipaa  terraform  aks  mlops")).toBeNull();
    expect(cleanDescription("Enterprise SOC home lab, ELK Stack SIEM, Splunk, Wazuh XDR. Detection rules, threat hunting")).not.toBeNull();
  });
  test("vendor rules in a homelab go to Vendor-Specific Rules", () => {
    expect(route(repo("a/wazuh-mikrotik-decoder", "Wazuh decoders and detection rules for MikroTik RouterOS syslog output", ["homelab"]))).toBe("### Vendor-Specific Rules");
  });
  test("agent container goes to Docker", () => {
    expect(route(repo("a/wazuh-agent", "Wazuh Agent container"))).toBe("### Docker");
  });
});

describe("untrusted input", () => {
  test("URLs and markdown control characters are removed from descriptions", () => {
    expect(cleanDescription("Wazuh rules, see https://evil.example/x and www.evil.example for **more** `code` | cell")).toBe("Wazuh rules, see and for more code cell.");
  });
  test("snake_case names survive", () => {
    expect(cleanDescription("Ansible role wazuh_agent for the Wazuh agent")).toBe("Ansible role wazuh_agent for the Wazuh agent.");
  });
  test("internal and non-http addresses are not requested", async () => {
    expect(await isPublicHost("http://127.0.0.1:8080/")).toBe(false);
    expect(await isPublicHost("http://localhost/")).toBe(false);
    expect(await isPublicHost("http://192.168.1.1/")).toBe(false);
    expect(await isPublicHost("http://[::1]/")).toBe(false);
    expect(await isPublicHost("file:///etc/passwd")).toBe(false);
    expect(await isPublicHost("not a url")).toBe(false);
  });
  test("public host is allowed", async () => {
    expect(await isPublicHost("https://wazuh.com/")).toBe(true);
  });
});

describe("scraped ambassador names", () => {
  test("markdown and HTML are removed", () => {
    expect(safeName("Eve](https://evil.example) <img src=x> **x**")).toBe("img src=x x");
  });
  test("normal names stay", () => {
    expect(safeName("  Marie-Claire  O'Neil ")).toBe("Marie-Claire O'Neil");
  });
  test("length is capped and empty names are rejected", () => {
    expect(safeName("a".repeat(100))!.length).toBe(60);
    expect(safeName("[]")).toBeNull();
  });
});

describe("link filter", () => {
  test("a URL glued to markup or a word character is still removed", () => {
    expect(cleanDescription("Wazuh rules _https://evil.example/x and `www.evil.example` here")).toBe("Wazuh rules and here.");
    expect(safeName("Eve_https://evil.example")).toBeNull();
  });
  test("e-mail addresses are removed", () => {
    expect(cleanDescription("Wazuh decoders, contact me at eve@evil.example for more")).toBe("Wazuh decoders, contact me at for more.");
  });
});
