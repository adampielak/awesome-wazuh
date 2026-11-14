#!/usr/bin/env bun
// Daily maintenance of README.md:
//  1. discover new Wazuh-related GitHub repositories and append them to the matching section,
//  2. move listed repositories that were archived or deleted to ARCHIVED.md, follow renames,
//  3. refresh the Wazuh Ambassador blog list from the official Wazuh newsroom.
// Usage: bun scripts/update.ts [--dry-run] [--repo-dir <path>]
// Env: GITHUB_TOKEN (optional, raises API limits), MIN_STARS (10), MAX_AGE_DAYS (365), MAX_ADD (25)

import { lookup } from "node:dns/promises";
import { parseArgs } from "node:util";

const MIN_STARS = Number(process.env.MIN_STARS ?? 10);
const MAX_AGE_DAYS = Number(process.env.MAX_AGE_DAYS ?? 365);
const MAX_ADD = Number(process.env.MAX_ADD ?? 25);
const TOKEN = process.env.GITHUB_TOKEN ?? "";
const UA = "awesome-wazuh-updater (+https://github.com/adampielak/awesome-wazuh)";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const log = (...a: unknown[]) => console.error(...a);

type Repo = {
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  pushed_at: string;
  archived: boolean;
  fork: boolean;
  topics?: string[];
  owner: { login: string };
};

// Section headings (exact text) and the keywords that route a repository there. First match wins.
const ROUTES: { heading: string; re: RegExp }[] = [
  { heading: "## Training & Certification", re: /\b(book|packt|course|udemy|certification|exam prep)\b/i },
  { heading: "### Vendor-Specific Rules", re: /\b(rules?|decoders?|ruleset)\b.*\b(fortigate|fortinet|pfsense|opnsense|mikrotik|cisco|palo ?alto|sophos|synology|unifi|pi-?hole|checkpoint|juniper|f5|citrix|vmware|esxi|proxmox|office ?365|m365|azure ad|entra|okta|cloudflare|nginx|apache|iis|postgres|mysql|mssql|oracle|sap|zimbra|exchange|kaspersky|eset|bitdefender|crowdstrike|defender|suricata|zeek|snort|modsecurity|wordpress)\b|\b(fortigate|fortinet|pfsense|opnsense|mikrotik|cisco|palo ?alto|sophos|synology|unifi|pi-?hole|checkpoint|juniper|esxi|proxmox|office ?365|m365|okta|zimbra|kaspersky|eset|bitdefender|crowdstrike|modsecurity)\b.*\b(rules?|decoders?|ruleset)\b/i },
  { heading: "### Labs", re: /\b(home ?lab|homelab|soc ?lab|labs?|cyber ?range|soc[- ](project|environment|stack|in[- ]a[- ]box)|attack simulation|purple team)\b/i },
  { heading: "### AI & MCP", re: /\b(mcp|model context protocol|llm|ollama|openai|gpt|langchain|ai[- ]agent|chatbot|copilot|\bai\b)/i },
  { heading: "### Docker", re: /\b(docker|compose|containers?|podman)\b/i },
  { heading: "### Kubernetes", re: /\b(kubernetes|k8s|helm|openshift|eks|aks|gke)\b/i },
  { heading: "### Terraform / OpenTofu", re: /\b(terraform|opentofu|pulumi|cloudformation|bicep)\b/i },
  { heading: "### Configuration Management", re: /\b(ansible|puppet|chef|saltstack|salt state|vagrant|packer)\b/i },
  { heading: "### Alerting", re: /\b(telegram|slack|discord|teams|mattermost|rocket\.?chat|ntfy|gotify|pagerduty|opsgenie|matrix|whatsapp|signal|e-?mail|smtp|webhook)\b/i },
  { heading: "### Threat Intelligence", re: /\b(misp|opencti|virustotal|abuseipdb|threat ?intel\w*|ioc|cti|alienvault|otx|greynoise|shodan|crowdsec)\b/i },
  { heading: "### SOAR", re: /\b(soar|shuffle|n8n|thehive|cortex|dfir[- ]?iris|tines|stackstorm|playbook)\b/i },
  { heading: "### Community Rules", re: /\b(rules?|decoders?|ruleset|sigma|detections?|yara|sca polic\w*|mitre|sysmon)\b/i },
  { heading: "### Custom Integrations", re: /\b(integrat\w*|connector|exporter|forwarder|plugin|grafana|prometheus|zabbix|graylog|splunk|elastic|opensearch|siem bridge|syslog|suricata|zeek|snort|osquery|velociraptor|jira|servicenow|glpi|itop)\b/i },
  { heading: "### Detection & Response", re: /\b(active response|incident response|threat hunting|detect\w*|brute ?force|ransomware|malware|dfir|forensic\w*)\b/i },
  { heading: "### General", re: /\b(lab|home ?lab|tutorial|guide|course|workshop|walkthrough|notes|cheat ?sheet|soc project|learning|training|write-?up)\b/i },
  { heading: "### Utilities", re: /./ },
];

// ---------- GitHub helpers ----------

async function gh(path: string): Promise<any> {
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(`https://api.github.com${path}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": UA,
        ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
      },
    });
    if (res.status === 403 || res.status === 429) {
      const reset = Number(res.headers.get("x-ratelimit-reset") ?? 0) * 1000;
      const wait = Math.min(Math.max(reset - Date.now(), 10_000), 120_000);
      log(`rate limited on ${path}, waiting ${Math.round(wait / 1000)} s`);
      await sleep(wait);
      continue;
    }
    if (!res.ok) throw new Error(`GitHub API ${res.status} on ${path}: ${(await res.text()).slice(0, 200)}`);
    return res.json();
  }
  throw new Error(`GitHub API retries exhausted on ${path}`);
}

// Unauthenticated search allows 10 requests per minute.
const searchPause = () => sleep(TOKEN ? 2_500 : 7_000);

async function search(q: string): Promise<Repo[]> {
  const out: Repo[] = [];
  for (let page = 1; page <= 10; page++) {
    const r = await gh(`/search/repositories?q=${encodeURIComponent(q)}&sort=stars&order=desc&per_page=100&page=${page}`);
    out.push(...r.items);
    await searchPause();
    if (r.items.length < 100 || out.length >= r.total_count) break;
  }
  return out;
}

// ---------- README model ----------

const repoKey = (s: string) => s.toLowerCase().replace(/\.git$/, "");
const GH_LINK = /https:\/\/github\.com\/([A-Za-z0-9-]+)\/([A-Za-z0-9._-]+)(?=[/#?)\s]|$)/g;
const NON_REPO_OWNERS = new Set(["orgs", "topics", "sponsors", "features", "marketplace", "settings", "about", "apps"]);

function listedRepos(md: string): Set<string> {
  const set = new Set<string>();
  for (const m of md.matchAll(GH_LINK)) if (!NON_REPO_OWNERS.has(m[1].toLowerCase())) set.add(repoKey(`${m[1]}/${m[2]}`));
  return set;
}

// Index of the line after which a new entry of the section should go: after its last list item.
function insertionLine(lines: string[], heading: string): number {
  const start = lines.findIndex((l) => l.trim() === heading);
  if (start < 0) return -1;
  const level = heading.match(/^#+/)![0].length;
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    const h = lines[i].match(/^(#+)\s/);
    if (h && h[1].length <= Math.max(level, 3)) { end = i; break; }
  }
  let last = -1;
  for (let i = start + 1; i < end; i++) if (/^- /.test(lines[i])) last = i;
  if (last >= 0) return last;
  // Empty section: after the heading's intro paragraph (or the heading itself).
  let i = start + 1;
  while (i < end && lines[i].trim() === "") i++;
  while (i < end && lines[i].trim() !== "" && !/^#/.test(lines[i])) i++;
  return i - 1;
}

// ---------- entry formatting ----------

const EN_WORDS = new Set("the and for with to of in on using from your is that this by an a based into via".split(" "));
const FOREIGN_WORDS = new Set("de da do das dos para com uma um em na no que el la los las con por del et le les des une und der die mit für zur ist".split(" "));

// Anything GitHub would turn into a link: URLs, www. hosts, e-mail addresses.
// Applied after markup characters are removed, so markup cannot hide a link.
const NO_LINKS = /\S*(https?:\/\/|www\.)\S*|\S+@\S+\.\S+/gi;

function cleanDescription(raw: string | null): string | null {
  if (!raw) return null;
  let d = raw
    .replace(/:[a-z0-9_+-]+:/g, "")
    .replace(/\p{Extended_Pictographic}|\uFE0F|\u200D/gu, "")
    .replace(/[\u2013\u2014]/g, "-")
    // Untrusted text: no links, HTML, code spans or table cells in the list.
    .replace(/[<>\[\]`|*~]/g, "")
    .replace(NO_LINKS, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^[-:|,.\s]+/, "");
  if (d.length < 12) return null;
  const letters = d.replace(/[^\p{L}]/gu, "");
  const latin = letters.replace(/[^\p{Script=Latin}]/gu, "");
  if (letters.length && latin.length / letters.length < 0.8) return null; // list is in English
  const words = d.toLowerCase().match(/\p{L}+/gu) ?? [];
  const en = words.filter((w) => EN_WORDS.has(w)).length;
  const foreign = words.filter((w) => FOREIGN_WORDS.has(w)).length;
  if (foreign > en) return null;
  if (words.length >= 8 && en === 0 && !/[,.;:()|&]/.test(d)) return null; // a bare list of tags, not a sentence
  // Keep whole sentences: enough to say what it is, short enough to scan.
  if (d.length > 160) {
    let out = "";
    for (const s of d.split(/(?<=[.!?])\s+/)) {
      if (out.length >= 40 || (out + " " + s).length > 160) break;
      out += " " + s;
    }
    d = out.trim() || d;
    if (d.length > 160) d = d.slice(0, 160).replace(/\s+\S*$/, "").replace(/[,;:\s-]+$/, "") + "...";
  }
  d = d[0].toUpperCase() + d.slice(1);
  if (!/[.!?]$/.test(d)) d += ".";
  return d;
}

const entry = (r: Repo, desc: string) => `- 🟡 [${r.full_name}](${r.html_url}) - ${desc}`;

function route(r: Repo): string {
  const hay = `${r.full_name.split("/")[1].replace(/[-_]/g, " ")} ${r.description ?? ""} ${(r.topics ?? []).join(" ")}`;
  return ROUTES.find((x) => x.re.test(hay))!.heading;
}

// ---------- step 1: discovery ----------

// Exploits and loaders are not resources for Wazuh users; detection content for them is.
const OFFENSIVE = /\b(exploit|loader|process injection|shellcode|payload|evasion|bypass|remote code execution|rce|c2)\b/i;
const DEFENSIVE = /\b(detect\w*|rules?|decoders?|monitor\w*|hunt\w*)\b/i;
const isOffensive = (d: string) => OFFENSIVE.test(d) && !DEFENSIVE.test(d);

async function discover(listed: Set<string>, excluded: Set<string>) {
  const since = new Date(Date.now() - MAX_AGE_DAYS * 86_400_000).toISOString().slice(0, 10);
  const q = `wazuh in:name,description,topics fork:false archived:false stars:>=${MIN_STARS} pushed:>=${since}`;
  const found = await search(q);
  log(`discovery: ${found.length} candidates for "${q}"`);
  const picked: { repo: Repo; desc: string; heading: string }[] = [];
  const skipped: Record<string, number> = {};
  const skip = (why: string) => (skipped[why] = (skipped[why] ?? 0) + 1);
  for (const r of found) {
    const key = repoKey(r.full_name);
    if (listed.has(key)) { skip("listed"); continue; }
    if (excluded.has(key) || excluded.has(r.owner.login.toLowerCase())) { skip("excluded"); continue; }
    if (r.owner.login.toLowerCase() === "wazuh") { skip("official org, curated by hand"); continue; }
    if (/^awesome[-_]/i.test(r.full_name.split("/")[1])) { skip("other list"); continue; }
    const desc = cleanDescription(r.description);
    if (!desc) { skip("no usable English description"); continue; }
    // A topic alone is not enough: generic security projects tag themselves with wazuh.
    if (!/wazuh/i.test(`${r.full_name} ${r.description}`)) { skip("wazuh only in topics"); continue; }
    if (isOffensive(r.description ?? "")) { skip("offensive tooling"); continue; }
    picked.push({ repo: r, desc, heading: route(r) });
  }
  log(`discovery: ${picked.length} new, skipped ${JSON.stringify(skipped)}`);
  return picked.slice(0, MAX_ADD);
}

// ---------- step 2: health of listed repositories ----------

async function checkListed(listed: string[]) {
  const seen = new Map<string, Repo>();
  // Batch repo: qualifiers, query string stays under the 256 character limit.
  let batch: string[] = [];
  const flush = async () => {
    if (!batch.length) return;
    for (const r of await search(batch.map((k) => `repo:${k}`).join(" "))) seen.set(repoKey(r.full_name), r);
    batch = [];
  };
  for (const k of listed) {
    if ([...batch, k].map((x) => `repo:${x}`).join(" ").length > 240) await flush();
    batch.push(k);
  }
  await flush();

  const archived: string[] = [];
  const gone: string[] = [];
  const renamed: [string, string][] = [];
  for (const k of listed) {
    const r = seen.get(k);
    if (r) { if (r.archived) archived.push(k); continue; }
    // Not returned by search: deleted, renamed, private, or a fork. Ask the web endpoint.
    const res = await fetch(`https://github.com/${k}`, { headers: { "User-Agent": UA }, redirect: "follow", signal: AbortSignal.timeout(20_000) }).catch(() => null);
    await sleep(1_000);
    if (!res) { log(`check: ${k} did not answer, left unchanged`); continue; }
    if (res.status === 404) { gone.push(k); continue; }
    if (!res.ok) { log(`check: ${k} returned ${res.status}, left unchanged`); continue; }
    const final = new URL(res.url).pathname.split("/").slice(1, 3).join("/");
    if (final && repoKey(final) !== k) renamed.push([k, final]);
    if (/This repository was archived by the owner/.test(await res.text())) archived.push(k);
  }
  return { archived, gone, renamed };
}

// ---------- step 3: Wazuh Ambassador blogs ----------

const AMB_BEGIN = "<!-- ambassadors:begin -->";
const AMB_END = "<!-- ambassadors:end -->";
// Social networks and video platforms are covered by the newsroom link, not listed as blogs.
const NOT_A_BLOG = /(^|\.)(linkedin\.com|youtube\.com|youtu\.be|github\.com|asciinema\.org|aur\.archlinux\.org|twitter\.com|x\.com|facebook\.com|instagram\.com|security-insider\.de|faun\.pub|systemweakness\.com|infosecwriteups\.com)$/;

const PRIVATE_IP = /^(0\.|10\.|127\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\.|::1$|::$|f[cd]|fe[89ab]|::ffff:)/i;

async function isPublicHost(url: string): Promise<boolean> {
  let u: URL;
  try { u = new URL(url); } catch { return false; }
  if (u.protocol !== "https:" && u.protocol !== "http:") return false;
  const addrs = await lookup(u.hostname, { all: true }).catch(() => []);
  return addrs.length > 0 && addrs.every((a) => !PRIVATE_IP.test(a.address));
}

// Scraped author name: plain text only, no markdown or HTML, bounded length.
const safeName = (s: string): string | null => {
  const n = s.replace(/[\[\]()<>`*|!~\\#_]/g, "").replace(NO_LINKS, "").replace(/\s+/g, " ").trim().slice(0, 60).trim();
  return n.length >= 2 ? n : null;
};
const MEDIUM_USER = /^[A-Za-z0-9._-]{1,50}$/;
const HOSTNAME = /^[a-z0-9-]+(\.[a-z0-9-]+)+$/;

async function ambassadorBlogs(): Promise<string[] | null> {
  const ua = { "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/130 Safari/537.36" };
  const first = await fetch("https://wazuh.com/newsroom/source/ambassadors/", { headers: ua });
  if (!first.ok) { log(`ambassadors: newsroom returned ${first.status}`); return null; }
  const html0 = await first.text();
  const nonce = html0.match(/"nonce":"([a-f0-9]+)"/)?.[1];
  const total = Number(html0.match(/data-total="(\d+)"/)?.[1] ?? 0);
  if (!nonce || !total) { log("ambassadors: nonce or total missing, layout changed"); return null; }
  const pages = [html0];
  for (let a = 1; a <= Math.ceil(total / 9) + 1; a++) {
    const body = new URLSearchParams({
      action: "ajax_load_more_posts", page: String(a), post_type: "news", order: "DESC", orderby: "date",
      posts_per_page: "9", nonce, category_name: "ambassadors", max_page: String(Math.ceil(total / 9)), offset: String(9 + (a - 1) * 9),
    });
    const res = await fetch("https://wazuh.com/wp-admin/admin-ajax.php", { method: "POST", headers: ua, body });
    const t = await res.text();
    if (!res.ok || !t.includes("post-card-link")) break;
    pages.push(t);
    await sleep(700);
  }
  type Post = { author: string; url: URL };
  const posts: Post[] = [];
  for (const p of pages)
    for (const card of p.split('<article class="post-card').slice(1)) {
      let href = card.match(/class="post-card-link" href="([^"]+)"/)?.[1];
      const author = safeName(card.match(/By ([^<]+?)\s*</)?.[1] ?? "");
      if (!href || !author) continue;
      if (!/^https?:/.test(href)) href = `https://${href}`;
      try { posts.push({ author, url: new URL(href) }); } catch { /* malformed link on the source page */ }
    }
  log(`ambassadors: ${posts.length} posts of ${total}`);
  if (posts.length < total * 0.8) { log("ambassadors: too few posts parsed, keeping the current list"); return null; }

  // One blog per home: Medium profile or own host. Name = most frequent author spelling.
  const blogs = new Map<string, { home: string; names: Map<string, number>; n: number }>();
  for (const { author, url } of posts) {
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    if (url.port || !HOSTNAME.test(host) || NOT_A_BLOG.test(host)) continue;
    let key: string, home: string;
    if (host === "medium.com") {
      const user = url.pathname.match(/^\/@([^/]+)/)?.[1];
      if (!user || !MEDIUM_USER.test(user)) continue;
      key = `medium:${user.toLowerCase()}`; home = `https://medium.com/@${user}`;
    } else if (host.endsWith(".medium.com")) {
      const user = host.replace(/\.medium\.com$/, "");
      if (!MEDIUM_USER.test(user)) continue;
      key = `medium:${user.toLowerCase()}`; home = `https://medium.com/@${user}`;
    } else {
      key = host; home = `https://${host}/`;
    }
    const b = blogs.get(key) ?? { home, names: new Map(), n: 0 };
    b.n++;
    const name = author.replace(/\s+/g, " ");
    b.names.set(name, (b.names.get(name) ?? 0) + 1);
    blogs.set(key, b);
  }
  const rows: { name: string; line: string }[] = [];
  for (const b of blogs.values()) {
    const name = [...b.names].sort((x, y) => y[1] - x[1] || y[0].length - x[0].length)[0][0];
    const where = b.home.startsWith("https://medium.com/") ? "Medium" : new URL(b.home).host.replace(/^www\./, "");
    // Blog URLs come from a third-party page, so they are never requested. A DNS
    // check (name exists, public address) drops dead domains without a connection.
    // shortcut: a live domain with a dead blog stays listed, fix by hand or exclusion.
    if (!(await isPublicHost(b.home))) {
      log(`ambassadors: ${b.home} has no public DNS record, skipped`);
      continue;
    }
    const count = b.n === 1 ? "1 article" : `${b.n} articles`;
    rows.push({ name, line: `- [${name}](${b.home}) - ${where === "Medium" ? "Medium profile" : `Blog at ${where}`}, ${count} featured in the Wazuh Ambassadors newsroom.` });
  }
  rows.sort((x, y) => x.name.localeCompare(y.name, "en"));
  return rows.map((r) => r.line);
}

// ---------- main ----------

async function main() {
  const { values: args } = parseArgs({
    options: { "dry-run": { type: "boolean", default: false }, "repo-dir": { type: "string", default: "." } },
  });
  const DIR = args["repo-dir"]!;
  const README = `${DIR}/README.md`;
  const ARCHIVED = `${DIR}/ARCHIVED.md`;
  const EXCLUDED = `${DIR}/data/excluded.txt`;

  const md0 = await Bun.file(README).text();
  const excluded = new Set(
    (await Bun.file(EXCLUDED).text().catch(() => ""))
      .split("\n").map((l) => l.replace(/#.*/, "").trim().toLowerCase()).filter(Boolean),
  );
  const listed = listedRepos(md0);
  let lines = md0.split("\n");
  const summary = { added: [] as string[], archived: [] as string[], removed: [] as string[], renamed: [] as string[], ambassadors: 0 };

  // Step 2 first, so a rename is not rediscovered as a new repository.
  const health = await checkListed([...listed]);
  for (const [from, to] of health.renamed) {
    const re = new RegExp(`https://github\\.com/${from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?=[/#?)\\s]|$)`, "gi");
    lines = lines.map((l) => l.replace(re, `https://github.com/${to}`));
    listed.add(repoKey(to));
    summary.renamed.push(`${from} -> ${to}`);
}
const moved: { line: string; why: string }[] = [];
for (const [keys, why] of [[health.archived, "archived"], [health.gone, "removed"]] as const) {
  for (const k of keys) {
    const re = new RegExp(`\\]\\(https://github\\.com/${k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/?\\)`, "i");
    const idx = lines.findIndex((l) => /^- /.test(l) && re.test(l));
    if (idx < 0) continue; // repo only referenced deeper (issue, file), keep it
    moved.push({ line: lines[idx], why });
    lines.splice(idx, 1);
    (why === "archived" ? summary.archived : summary.removed).push(k);
  }
}

for (const { repo, desc, heading } of await discover(listed, excluded)) {
  const at = insertionLine(lines, heading);
  if (at < 0) { log(`discovery: heading "${heading}" not found, ${repo.full_name} skipped`); continue; }
  lines.splice(at + 1, 0, entry(repo, desc));
  summary.added.push(`${repo.full_name} -> ${heading.replace(/^#+ /, "")}`);
}

let md = lines.join("\n");
const amb = await ambassadorBlogs().catch((e) => { log(`ambassadors: ${e}`); return null; });
const b = md.indexOf(AMB_BEGIN), e = md.indexOf(AMB_END);
if (amb && b >= 0 && e > b) {
  md = `${md.slice(0, b + AMB_BEGIN.length)}\n${amb.join("\n")}\n${md.slice(e)}`;
  summary.ambassadors = amb.length;
}

if (moved.length) {
  const day = new Date().toISOString().slice(0, 10);
  let arch = await Bun.file(ARCHIVED).text().catch(() => "");
  if (!arch) arch = "# Archived Entries\n\nRepositories removed from the main list because they were archived by their owners or no longer exist. Kept for reference.\n";
  arch = arch.trimEnd() + "\n" + moved.map((m) => `${m.line} (${m.why} ${day})`).join("\n") + "\n";
  if (!args["dry-run"]) await Bun.write(ARCHIVED, arch);
}
if (md !== md0 && !args["dry-run"]) await Bun.write(README, md);

console.log(JSON.stringify(summary, null, 2));
}

export { safeName, isPublicHost, isOffensive, cleanDescription, route, insertionLine, listedRepos };

if (import.meta.main) await main();
