# Awesome Wazuh [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> [Wazuh](https://wazuh.com/) is a free and open source security platform that unifies XDR and SIEM protection for endpoints and cloud workloads.

Documentation, deployment code, rules, integrations, tools and community knowledge for Wazuh. New community repositories are checked daily and added when they meet the [inclusion criteria](CONTRIBUTING.md#inclusion-criteria).

## Contents

- [Official Documentation](#official-documentation)
- [Getting Started](#getting-started)
- [Setup Guides](#setup-guides)
- [Deployment](#deployment)
  - [Docker](#docker)
  - [Kubernetes](#kubernetes)
  - [Terraform / OpenTofu](#terraform--opentofu)
  - [Configuration Management](#configuration-management)
  - [Virtual Machines](#virtual-machines)
- [Rules & Detection](#rules--detection)
  - [Community Rules](#community-rules)
  - [Vendor-Specific Rules](#vendor-specific-rules)
  - [Detection Modules](#detection-modules)
- [Integrations](#integrations)
  - [Alerting](#alerting)
  - [Ticketing](#ticketing)
  - [Threat Intelligence](#threat-intelligence)
  - [Cloud Platforms](#cloud-platforms)
  - [SOAR](#soar)
  - [Custom Integrations](#custom-integrations)
- [Maintenance](#maintenance)
  - [Backup & Restore](#backup--restore)
  - [Known Issues](#known-issues)
- [Tools & Utilities](#tools--utilities)
  - [Utilities](#utilities)
  - [AI & MCP](#ai--mcp)
- [Compliance](#compliance)
- [Training & Certification](#training--certification)
- [Guides & Tutorials](#guides--tutorials)
  - [Blogs](#blogs)
  - [AI & LLM Integration](#ai--llm-integration)
  - [Detection & Response](#detection--response)
  - [Labs](#labs)
  - [General](#general)
- [Wazuh Ambassadors](#wazuh-ambassadors)
  - [Ambassador Blogs](#ambassador-blogs)
- [Community](#community)
- [Examples](#examples)

## Official Documentation

- 🟢 [Wazuh Documentation](https://documentation.wazuh.com/) - Installation, configuration, and usage guides.
- 🟢 [Architecture Overview](https://documentation.wazuh.com/current/getting-started/architecture.html) - System design and components.
- 🟢 [API Reference](https://documentation.wazuh.com/current/user-manual/api/reference.html) - REST API endpoints.
- 🟢 [Wazuh Blog](https://wazuh.com/blog/) - Weekly technical articles from the Wazuh team.
- 🟢 [Release Notes](https://documentation.wazuh.com/current/release-notes/index.html) - Version history and changelog.

## Getting Started

- 🟢 [Installation Guide](https://documentation.wazuh.com/current/installation-guide/) - Step-by-step deployment instructions.
- 🟢 [Quickstart](https://documentation.wazuh.com/current/quickstart.html) - All-in-one installation for a first test environment.
- 🟢 [Wazuh Cloud](https://cloud.wazuh.com/) - Managed SaaS option with a free trial.

## Setup Guides

Step-by-step setup walkthroughs for Wazuh installation, configuration, and operational tasks.

- 🟡 [samma-io/wazuh-help](https://github.com/samma-io/wazuh-help) - Setup help, troubleshooting, and operational notes for Wazuh deployments.

## Deployment

### Docker

- 🟢 [Official Docker Guide](https://documentation.wazuh.com/current/installation-guide/docker.html) - Container deployment documentation.
- 🟢 [wazuh-docker](https://github.com/wazuh/wazuh-docker) - Docker Compose files and images for single-node and multi-node stacks.
- 🟡 [TridentStack/wazuh-docker-secure](https://github.com/TridentStack/wazuh-docker-secure) - Secure Wazuh deployment automation for Docker with enhanced password management, certificate generation, and security hardening.

### Kubernetes

- 🟢 [Official Kubernetes Guide](https://documentation.wazuh.com/current/installation-guide/kubernetes.html) - Kubernetes cluster deployment.
- 🟢 [wazuh-kubernetes](https://github.com/wazuh/wazuh-kubernetes) - Kubernetes manifests for a Wazuh cluster.
- 🟡 [morgoved/wazuh-helm](https://github.com/morgoved/wazuh-helm) - Helm chart for Wazuh.
- 🟡 [MaximeWewer/wazuh-operator](https://github.com/MaximeWewer/wazuh-operator) - Kubernetes operator for Wazuh.
- 🟡 [pyToshka/docker-wazuh-agent](https://github.com/pyToshka/docker-wazuh-agent) - Wazuh agent container image with manifests for monitoring Kubernetes clusters (EKS, AKS, GKE).

### Terraform / OpenTofu

- 🟡 [Terraform/OpenTofu Provider](https://github.com/grulicht/terraform-provider-wazuh) - Community provider for the Wazuh API.
- 🟡 [Terraform Registry](https://registry.terraform.io/providers/grulicht/wazuh) - Registry entry of the community provider.
- 🟢 [Feature Request](https://github.com/wazuh/wazuh/issues/20176) - Official Wazuh provider (planned).

### Configuration Management

- 🟢 [Official Ansible Guide](https://documentation.wazuh.com/current/deployment-options/deploying-with-ansible/index.html) - Multi-host deployment automation.
- 🟢 [wazuh-ansible](https://github.com/wazuh/wazuh-ansible) - Ansible roles and playbooks (use release branches for production).
- 🟡 [aleemladha/ludus_wazuh_agent](https://github.com/aleemladha/ludus_wazuh_agent) - Ansible role that deploys Wazuh agents to Windows, Debian and Ubuntu hosts on Ludus ranges.

### Virtual Machines

- 🟢 [Virtual Machines (OVA/AMI)](https://github.com/wazuh/wazuh-virtual-machines) - Pre-built images for a quick proof of concept.

## Rules & Detection

- 🟢 [Rules Documentation](https://documentation.wazuh.com/current/user-manual/ruleset/index.html) - Rule syntax and optimization.
- 🟢 [Custom Rules Guide](https://documentation.wazuh.com/current/user-manual/ruleset/custom.html) - Writing and testing custom rules.
- 🟢 [Official Ruleset](https://github.com/wazuh/wazuh/tree/v4.14.10/ruleset) - Default rules, decoders, CDB lists and SCA policies shipped with Wazuh 4.14.

### Community Rules

General-purpose community rule collections.

- 🟡 [socfortress/Wazuh-Rules](https://github.com/socfortress/Wazuh-Rules) - Community rule collection.
- 🟡 [bayusky/wazuh-custom-rules-and-decoders](https://github.com/bayusky/wazuh-custom-rules-and-decoders) - Custom Wazuh decoders and rules.
- 🟡 [INFOKOM-KI/php2shell-wazuh-rules](https://github.com/INFOKOM-KI/php2shell-wazuh-rules) - Wazuh rules for php2shell exploit detection.
- 🟡 [theflakes/StoW](https://github.com/theflakes/StoW) - Sigma to Wazuh rule converter.
- 🟡 [fredycibersec/ENS-Wazuh-integration](https://github.com/fredycibersec/ENS-Wazuh-integration) - ENS (Esquema Nacional de Seguridad, RD 311/2022) compliance integration for Wazuh - SCA policies, detection rules and dashboards.
- 🟡 [shahenwaz/wazuh-security-monitoring](https://github.com/shahenwaz/wazuh-security-monitoring) - A Wazuh SIEM project covering file integrity monitoring, Windows and SSH authentication detection, and security event analysis.
- 🟡 [alonsobsd/wazuh-freebsd-ruleset](https://github.com/alonsobsd/wazuh-freebsd-ruleset) - Resources for a better integration between FreeBSD and Wazuh SIEM.
- 🟡 [zshguy/tyrian-detection-pack](https://github.com/zshguy/tyrian-detection-pack) - Compiler from Sigma to Wazuh, Splunk and Sentinel, with a ready SigmaHQ ruleset for Wazuh.
- 🟡 [heraclescap/sigwaz-cli](https://github.com/heraclescap/sigwaz-cli) - Convert Sigma detection rules to production-ready Wazuh XML. CLI tool with batch processing, ZIP input, field mapping, and config file support.
- 🟡 [RasheedFarhat/DaC-Pipeline](https://github.com/RasheedFarhat/DaC-Pipeline) - Automated Detection-as-Code (DaC) CI/CD pipeline for validating and programmatically deploying SIEM detection rules via GitHub Actions and the Wazuh API.
- 🟡 [mym0us3r/COPY-FAIL-Detection-with-Wazuh-4.14.4](https://github.com/k1shlabs/COPY-FAIL-Detection-with-Wazuh-4.14.4) - Detection of the COPY FAIL Linux local privilege escalation (authencesn page cache write) with Wazuh 4.14.4.

### Vendor-Specific Rules

Decoders and rulesets for specific devices, appliances, and platforms.

- 🟡 [Fortigate Rules & Decoders](https://github.com/alextibor/wazuh-fortigate-rules-decoders) - Fortigate device monitoring.
- 🟡 [Pi-hole Decoder & Rules](https://github.com/Tomo-9925/wazuh-pi-hole-decoder-and-rules) - Pi-hole DNS sinkhole monitoring and detection.
- 🟡 [Synology DSM (st0rm-cr0w)](https://github.com/st0rm-cr0w/wazuh-synology-dsm-nas-decoder-and-rules) - Synology DSM decoder and rules.
- 🟡 [Synology DSM (Tomo-9925)](https://github.com/Tomo-9925/wazuh-synology-dsm-decoder-and-rules) - Alternative Synology DSM decoder implementation.
- 🟡 [Unifi Decoder](https://github.com/EvilForge/wazuh-unifi-decoder) - Ubiquiti Unifi network monitoring.
- 🟡 [ph0tacular/unifi-wazuh](https://github.com/ph0tacular/unifi-wazuh) - Wazuh decoders and rules for UniFi devices.
- 🟡 [BeardedTinker/wazuh-homelab-security](https://github.com/BeardedTinker/wazuh-homelab-security) - Practical Wazuh rules and decoders for homelab security (UniFi, Synology DSM, Home Assistant).
- 🟡 [H2FSpawn/wazuh-mikrotik-decoder](https://github.com/H2FSpawn/wazuh-mikrotik-decoder) - Wazuh decoders and detection rules for MikroTik RouterOS syslog output.
- 🟡 [xArshh/Wazuh-MikroTik-Integration](https://github.com/xArshh/Wazuh-MikroTik-Integration) - MikroTik RouterOS log decoders and security detection rules for Wazuh + Active Response Shell Code.

### Detection Modules

- 🟢 [File Integrity Monitoring (FIM)](https://documentation.wazuh.com/current/user-manual/capabilities/file-integrity-monitoring/index.html) - Detect unauthorized file changes.
- 🟢 [Vulnerability Detection](https://documentation.wazuh.com/current/user-manual/capabilities/vulnerability-detection/index.html) - CVE scanning and assessment.
- 🟢 [Configuration Assessment (SCA)](https://documentation.wazuh.com/current/user-manual/capabilities/sec-config-assessment/index.html) - Compliance validation and hardening.
- 🟢 [Malware Detection](https://documentation.wazuh.com/current/user-manual/capabilities/malware-detection/index.html) - ClamAV and YARA integration.
- 🟢 [Active Response](https://documentation.wazuh.com/current/user-manual/capabilities/active-response/index.html) - Automated threat response.

## Integrations

Connect Wazuh with external platforms for alerting, ticketing, threat intelligence, and orchestration.

### Alerting

- 🟢 [Integration with External APIs](https://documentation.wazuh.com/current/user-manual/manager/integration-with-external-apis.html) - Built-in Slack, PagerDuty, Shuffle and custom integrations through the integrator daemon.
- 🟢 [Email Alerts](https://documentation.wazuh.com/current/user-manual/manager/alert-management.html) - SMTP alert delivery and email reports.
- 🟡 [shivasairaj/sentinelops-real-time-siem-soc](https://github.com/shivasairaj/sentinelops-real-time-siem-soc) - Real-time SIEM & SOC monitoring platform built using Wazuh, Python Flask, Kali Linux, and Telegram alerting for threat detection and incident monitoring.
- 🟡 [0xdolan/wazuh-telegram-integration](https://github.com/0xdolan/wazuh-telegram-integration) - Sends Wazuh alerts to Telegram.
- 🟡 [0xdolan/wazuh-slack-integration](https://github.com/0xdolan/wazuh-slack-integration) - Sends Wazuh alerts to Slack.

### Ticketing

- 🟢 [ServiceNow Integration](https://wazuh.com/blog/integrating-servicenow-with-wazuh/) - REST API and Python script.
- 🟡 [Jira Integration](https://www.songer.pro/how-to-send-wazuh-alerts-to-jira/) - Community guide.

### Threat Intelligence

- 🟢 [VirusTotal](https://documentation.wazuh.com/current/user-manual/capabilities/malware-detection/virus-total-integration.html) - File hash enrichment for FIM events.
- 🟢 [CDB Lists](https://documentation.wazuh.com/current/user-manual/ruleset/cdb-list.html) - Custom threat intelligence lists.

### Cloud Platforms

- 🟢 [Amazon Web Services](https://documentation.wazuh.com/current/cloud-security/aws/index.html) - CloudTrail, GuardDuty, Security Hub, Macie and Security Lake.
- 🟢 [Microsoft Azure](https://documentation.wazuh.com/current/cloud-security/azure/index.html) - Log Analytics, Microsoft Graph and Intune.
- 🟢 [Google Cloud](https://documentation.wazuh.com/current/cloud-security/gcp/index.html) - Pub/Sub and Cloud Storage integration.

### SOAR

- 🟡 [Shuffle SOAR](https://shuffler.io/) - Open source SOAR with Wazuh support.
- 🟢 [Shuffle + Teams Integration](https://wazuh.com/blog/integrating-wazuh-with-microsoft-teams-using-shuffle/) - SOAR-based Teams alerting.
- 🟡 [Automated Threat Detection & Response (Medium)](https://medium.com/@naseefhussain83/automated-threat-detection-response-using-wazuh-shuffle-777bee8370fc) - Wazuh and Shuffle threat response automation.

### Custom Integrations

- 🟡 [wazuh2thehive](https://github.com/crow1011/wazuh2thehive) - TheHive case management integration.
- 🟡 [wazuh-opencti](https://github.com/juaromu/wazuh-opencti) - OpenCTI threat intelligence platform.
- 🟡 [wazuh-integrations](https://github.com/maikroservice/wazuh-integrations) - Collection of custom integrations.
- 🟡 [Prometheus Exporter](https://github.com/pyToshka/wazuh-prometheus-exporter) - Prometheus metrics and monitoring.
- 🟡 [Sophos-Wazuh-SOC](https://github.com/JoernSchoenyan/Sophos-Wazuh-SOC) - Sophos firewall and endpoint integration for SOC operations.
- 🟡 [Telegram Alerting](https://github.com/bayusky/wazuh-telegram) - Telegram notification script.
- 🟡 [Custom Telegram](https://github.com/eugenehr/wazuh-custom-telegram) - Advanced Telegram alert formatting.
- 🟡 [wazuh-nmap](https://github.com/juaromu/wazuh-nmap) - Nmap network scan integration.
- 🟡 [lex-org/wazuh-tenant-orchestrator](https://github.com/lex-org/wazuh-tenant-orchestrator) - Automated multi-tenant provisioning for Wazuh SIEM.
- 🟡 [initiativa/wazuh](https://github.com/initiativa/wazuh) - GLPI plugin to integrate Wazuh.

## Maintenance

### Backup & Restore

- 🟢 [Creating a Backup of Central Components](https://documentation.wazuh.com/current/migration-guide/files-backup/creating/wazuh-central-components.html) - Official guide: directories to back up (`/etc/wazuh-indexer/`, `/var/ossec/etc/`, certificates) using `rsync` and `tar`.
- 🟢 [Restoring Central Components](https://documentation.wazuh.com/current/migration-guide/restoring/wazuh-central-components.html) - Step-by-step restore for single node and multi-node cluster.
- 🟢 [Index Backup Management](https://wazuh.com/blog/index-backup-management/) - OpenSearch snapshots for alert data: filesystem, S3, Azure, GCS and SLM automation.
- 🟡 [Snapshot and Restore, Practical Guide](https://sobanmalikk.medium.com/snapshot-and-restore-configuration-in-wazuh-addb9ac3180e) - `path.repo` configuration, snapshots via CLI and Dashboard UI, cron automation.

### Known Issues

#### Services Fail to Start After Reboot on Debian/Ubuntu

A well-known issue on all-in-one installations: Wazuh services (`wazuh-indexer`, `wazuh-manager`, `wazuh-dashboard`) have no `After=` dependencies in their systemd units, causing race conditions on boot. Symptoms: dashboard returns "server is not ready yet", indexer enters `failed` state, or manager fails due to a missing PID file.

- 🟡 [wazuh-indexer #201](https://github.com/wazuh/wazuh-indexer/issues/201) - Indexer fails after reboot: missing `/var/log/wazuh-indexer/gc.log` directory.
- 🟡 [wazuh-packages #1962](https://github.com/wazuh/wazuh-packages/issues/1962) - Indexer enters `failed` state on reboot (v4.4.0+).
- 🟡 [wazuh/wazuh #31037](https://github.com/wazuh/wazuh/issues/31037) - `Permission denied` on GC log at JVM startup.

**Workaround**: create a systemd override to enforce startup order:

```ini
# /etc/systemd/system/wazuh-manager.service.d/override.conf
[Unit]
After=wazuh-indexer.service network-online.target
```

```ini
# /etc/systemd/system/wazuh-dashboard.service.d/override.conf
[Unit]
After=wazuh-indexer.service network-online.target
```

Then reload: `systemctl daemon-reload`. If the indexer still needs extra time to initialize, add `ExecStartPre=/bin/sleep 15` to the dashboard override.

## Tools & Utilities

### Utilities

- 🟡 [Wazuh Tools](https://github.com/branchnetconsulting/wazuh-tools) - Collection of operational utility scripts.
- 🟡 [Wazuh Auto-Generator](https://github.com/21Yeet21/wazuh-auto-generator) - Generate decoders and rules from raw log samples using deterministic pattern analysis, with bulk log analysis and in-app field extraction simulation.
- 🟡 [BeardedTinker/ha-wazuh-agent-addon](https://github.com/BeardedTinker/ha-wazuh-agent-addon) - Home Assistant Add-on running Wazuh Agent for shipping HA logs to Wazuh Manager.
- 🟡 [autonubil/go-wazuh](https://github.com/autonubil/go-wazuh) - Go client for the Wazuh REST API.
- 🟡 [mrtc0/wazuh-ruby-client](https://github.com/mrtc0/wazuh-ruby-client) - Wazuh API client for Ruby.
- 🟡 [zbalkan/rulevis](https://github.com/zbalkan/rulevis) - Renders a Wazuh ruleset as an interactive force-directed graph.
- 🟡 [zbalkan/wazuhevtx](https://github.com/zbalkan/wazuhevtx) - A Python tool that parses EVTX files and converts them into JSON formatted logs mimicking Wazuh agent behavior in version 4.x.
- 🟡 [xrisbarney/Wazuh-alert-manager](https://github.com/xrisbarney/Wazuh-alert-manager) - Wazuh dashboard plugin that adds alert triage (status, assignee, comments), case management with evidence tracking and attack-path graphs, automation rules and reporting on top of Wazuh 4.12 to 4.14, keeping the native alert indices read-only.

### AI & MCP

- 🟡 [MCP Server Wazuh](https://github.com/gbrigandi/mcp-server-wazuh) - Model Context Protocol server for Wazuh.
- 🟡 [Wazuh MCP Server](https://github.com/gensecaihq/Wazuh-MCP-Server) - Alternative MCP implementation.
- 🟡 [zhadyz/AI_SOC](https://github.com/zhadyz/AI_SOC) - Open-source AI-augmented Security Operations Center using LLMs + Multi-Agent Orchestration | Foundation-Sec-8B | Wazuh | TheHive | RAG.
- 🟡 [INFOKOM-KI/Wazuh-MCP-Server](https://github.com/INFOKOM-KI/Wazuh-MCP-Server) - MCP server for SOC automation with Wazuh.
- 🟡 [socfortress/wazuh-mcp-server](https://github.com/socfortress/wazuh-mcp-server) - MCP server for the Wazuh manager API.
- 🟡 [soctalk/soctalk](https://github.com/soctalk/soctalk) - AI-powered multi-tenant SOC automation agent using LangGraph with Wazuh, Cortex, TheHive & MISP integration.
- 🟡 [gensecaihq/Wazuh-Autopilot](https://github.com/gensecaihq/Wazuh-Autopilot) - Agentic SOC for Wazuh built on Strands Agents that triages, investigates and plans response through the Wazuh MCP server.
- 🟡 [octopus237/Agentic-AI](https://github.com/octopus237/Agentic-AI) - An Agentic AI with correlation capabilities for Wazuh SIEM XDR deployment.
- 🟡 [Sbharadwaj05/sb-siem-mcp](https://github.com/Sbharadwaj05/sb-siem-mcp) - MCP server that connects LLMs to Wazuh for natural language threat hunting, alert analysis and compliance checks.

## Compliance

Map Wazuh capabilities to regulatory frameworks.

- 🟢 [PCI-DSS](https://documentation.wazuh.com/current/compliance/pci-dss/index.html) - Payment Card Industry Data Security Standard.
- 🟢 [GDPR](https://documentation.wazuh.com/current/compliance/gdpr/index.html) - EU data protection regulation.
- 🟢 [NIS-2](https://wazuh.com/blog/ensuring-nis2-compliance-with-wazuh/) - EU directive on the security of network and information systems.
- 🟢 [ISO 27001](https://documentation.wazuh.com/current/compliance/index.html) - Information security management standard.
- 🟢 [HIPAA](https://documentation.wazuh.com/current/compliance/hipaa/index.html) - Healthcare data protection.
- 🟢 [NIST 800-53](https://documentation.wazuh.com/current/compliance/nist/index.html) - Federal security controls.
- 🟢 [TSC (SOC 2)](https://documentation.wazuh.com/current/compliance/tsc/index.html) - Trust Services Criteria.

## Training & Certification

- 🟢 [Official Training Courses](https://wazuh.com/services/training-courses/) - Authorized courses from the Wazuh team.
- 🟡 [YouTube Tutorials](https://www.youtube.com/c/WazuhProject) - Official video guides.
- 🟡 [Udemy - Complete Wazuh Course](https://www.udemy.com/course/complete-wazuh-course/) - Beginner to advanced.
- 🟡 [initMAX - Wazuh Training](https://www.initmax.com/wazuh-training/) - Certified Wazuh Professional credential.
- 🟡 [SIEM Intelligence - Certified Wazuh Administrator](https://www.siemintelligence.com/wazuh-admin-training) - CWA credential.
- 🟡 [PacktPublishing/Security-Monitoring-using-Wazuh](https://github.com/PacktPublishing/Security-Monitoring-using-Wazuh) - Security Monitoring using Wazuh, published by Packt.

## Guides & Tutorials

Community-contributed guides for specific use cases and advanced configurations.

### Blogs

- 🟡 [Wazuh.blog](https://wazuh.blog/) - Independent blog about Wazuh in Polish and English: deployments, configuration, rules and threat detection, written against vendor documentation ([English version](https://wazuh.blog/en/)).

### AI & LLM Integration

- 🟡 [Local Ollama in the Wazuh Dashboard](https://blog.pytoshka.me/en/post/local-ollama-in-the-wazuh-dashboard-for-llm-powered-insights/) - LLM-powered alert insights using a local Ollama instance embedded in the Wazuh Dashboard.
- 🟡 [Wazuh + AWS Bedrock + MCP (Part 1)](https://blog.pytoshka.me/en/post/wazuh-aws-bedrock-mcp-part-1/) - Integrating Wazuh with AWS Bedrock and Model Context Protocol for AI-driven security analysis.
- 🟡 [Wazuh + AWS Bedrock + MCP (Part 2)](https://blog.pytoshka.me/en/post/wazuh-aws-bedrock-mcp-part-2/) - Advanced configuration and use cases for Wazuh + AWS Bedrock + MCP integration.

### Detection & Response

- 🟡 [SOAR Flow Guide](https://github.com/malwarekid/SOAR-Flow) - SOAR orchestration and automation patterns.
- 🟡 [Bruteforce Detection Guide](https://github.com/hasanaijaz/Wazuh-SIEM-Bruteforce-Detection) - Detecting and responding to brute force attacks.
- 🟡 [Ahmed-Emad-Nasr/Malware-Analysis-and-Prevention-Strategy](https://github.com/Ahmed-Emad-Nasr/Malware-Analysis-and-Prevention-Strategy) - Malware Analysis and Prevention Strategy (Wazuh SIEM, VirusTotal, Static and Dynamic Malware Analysis).
- 🟡 [AbstractionsLab/idps-escape](https://github.com/AbstractionsLab/idps-escape) - IDPS-ESCAPE: Intrusion Detection and Prevention System - Enhanced Security through a Cooperative Anomaly Prediction Engine.

### Labs

Home labs and SOC lab builds with Wazuh.
- 🟡 [0xMR007/Lab4PurpleSec](https://github.com/0xMR007/Lab4PurpleSec) - Purple team homelab with a vulnerable Active Directory (GOAD), a Docker web DMZ, pfSense and Suricata.
- 🟡 [AJahmadcyber/homelab-mdr](https://github.com/AJahmadcyber/homelab-mdr) - Open-source MDR home lab - Wazuh, TheHive, Cortex, n8n, pfSense+Suricata. Portfolio project mapped to MITRE ATT&CK.
- 🟡 [M-med/Active-Directory-Simulation-Attack-](https://github.com/M-med/Active-Directory-Simulation-Attack-) - Purple team lab simulating Active Directory attacks (Kerberoasting, BloodHound, lateral movement) and the matching hardening.
- 🟡 [ChiefGyk3D/siem-docker-stack](https://github.com/ChiefGyk3D/siem-docker-stack) - Dockerized SIEM stack with hot/warm tiering: OpenSearch, Logstash, Grafana, Wazuh, Prometheus, InfluxDB and syslog-ng.
- 🟡 [Ahmed-Emad-Nasr/SOC-Environment](https://github.com/Ahmed-Emad-Nasr/SOC-Environment) - SOC lab with Wazuh SIEM and EDR, Suricata, OpenSearch indexer, YARA, Sysmon, Atomic Red Team and VirusTotal.
- 🟡 [Atlantium-AI/wazuh-n8n-lab-setup](https://github.com/Atlantium-AI/wazuh-n8n-lab-setup) - Files and scripts to set up a Wazuh and n8n lab.
- 🟡 [HK101-cyber/soc-home-lab](https://github.com/HK101-cyber/soc-home-lab) - SOC home lab with ELK, Splunk and Wazuh: detection rules, threat hunting, attack simulations and dashboards.
- 🟡 [UsmanPrime/Wazuh-Setup](https://github.com/UsmanPrime/Wazuh-Setup) - Step-by-step Wazuh home lab from the official OVA, including hypervisor networking and tuning for low-RAM systems.
- 🟡 [p3nix/malware-hub-honeynet](https://github.com/p3nix/malware-hub-honeynet) - Internet-facing honeynet: T-Pot, Wazuh, Zeek/Suricata, Telegram + VirusTotal alerting and a sandboxed malware pipeline into a REMnux vault.
- 🟡 [Zep11/Home-SOC-Lab-Wazuh](https://github.com/Zep11/Home-SOC-Lab-Wazuh) - Home SOC lab for detection engineering, log analysis and threat hunting with Wazuh, Sysmon and MITRE ATT&CK.
- 🟡 [tofan0810/Wazuh-SOC-lab](https://github.com/tofan0810/Wazuh-SOC-lab) - SOC and SOAR lab with Wazuh 4.14, Suricata, Sysmon, n8n, Telegram ChatOps and Jira Cloud.
- 🟡 [pho5nix/Red-Threat-Redemption-SIEM](https://github.com/pho5nix/Red-Threat-Redemption-SIEM) - Debian 13 SIEM build with Elasticsearch, Kibana, Filebeat, Vector, Wazuh manager, Zeek and pfSense/Suricata integration.
- 🟡 [manishrawat21/soc-automation-lab](https://github.com/manishrawat21/soc-automation-lab) - Documented SOC automation workflow using Wazuh, N8N, Caldera, and Velociraptor.

### General

- 🟡 [Wazuh Complete Guide](https://github.com/Esther7171/Wazuh-SOC-Lab) - Comprehensive Wazuh setup and configuration guide.

## Wazuh Ambassadors

Practitioners recognized by Wazuh for publishing guides, tools, videos and talks.

- 🟢 [Ambassadors Program](https://wazuh.com/ambassadors-program/) - Program levels, benefits and application form.
- 🟢 [Find Your Ambassador](https://wazuh.com/ambassadors-program/find-your-ambassador/) - Directory of ambassadors by country, skills and availability.
- 🟢 [Ambassadors Newsroom](https://wazuh.com/newsroom/source/ambassadors/) - Every article, video and LinkedIn post published by ambassadors.
- [Ambassador Activities Guide](https://github.com/adampielak/awesome-wazuh/blob/main/docs/ambassador.md) - Content creation, speaking, training and partnerships.

### Ambassador Blogs

Blogs and Medium profiles of ambassadors, rebuilt daily from the newsroom, plus ambassadors whose blogs are not featured there. Posts published only on LinkedIn or YouTube are linked from the newsroom above.

<!-- ambassadors:begin -->
- [Abdelmlak Said](https://medium.com/@abdelmlaksaid) - Medium profile, 1 article featured in the Wazuh Ambassadors newsroom.
- [Adam Pielak](https://wazuh.blog/en/about/) - Blog at wazuh.blog, in Polish and English.
- [Aditya Jaishi](https://medium.com/@jaishiaditya2000) - Medium profile, 3 articles featured in the Wazuh Ambassadors newsroom.
- [Ahmed Abbes](https://medium.com/@ahmedabbes832) - Medium profile, 4 articles featured in the Wazuh Ambassadors newsroom.
- [Ahmed Abdelrazek](https://medium.com/@ahmed.abdelrazek.1) - Medium profile, 3 articles featured in the Wazuh Ambassadors newsroom.
- [Albin Haliti](https://medium.com/@albinhaliti6) - Medium profile, 1 article featured in the Wazuh Ambassadors newsroom.
- [Anmol Vats](https://medium.com/@anmolvats220703) - Medium profile, 3 articles featured in the Wazuh Ambassadors newsroom.
- [Arasy Dafa Sulistya Kurniawan](https://medium.com/@arasydafa) - Medium profile, 3 articles featured in the Wazuh Ambassadors newsroom.
- [Aravind Raja](https://medium.com/@aravindraja150) - Medium profile, 1 article featured in the Wazuh Ambassadors newsroom.
- [Arbnor Mustafa](https://blog.sentry.security/) - Blog at blog.sentry.security, 1 article featured in the Wazuh Ambassadors newsroom.
- [Arbnor Mustafa](https://medium.com/@arbnormustafa) - Medium profile, 2 articles featured in the Wazuh Ambassadors newsroom.
- [Baptiste Leterrier](https://ghost.baptiste-leterrier.com/) - Blog at ghost.baptiste-leterrier.com, 3 articles featured in the Wazuh Ambassadors newsroom.
- [Bayu Sangkaya](https://medium.com/@bayusangkaya) - Medium profile, 2 articles featured in the Wazuh Ambassadors newsroom.
- [Benyamin Mahdikhani](https://medium.com/@benyaminmahdikhany) - Medium profile, 1 article featured in the Wazuh Ambassadors newsroom.
- [Bruno Castel](https://medium.com/@bcastel) - Medium profile, 1 article featured in the Wazuh Ambassadors newsroom.
- [Candra Utama](https://medium.com/@utama.candra) - Medium profile, 1 article featured in the Wazuh Ambassadors newsroom.
- [Chinaza Emmanuela Obidike](https://medium.com/@chinazaObidike) - Medium profile, 2 articles featured in the Wazuh Ambassadors newsroom.
- [Christian Vega](https://chr1sv3g4.substack.com/) - Blog at chr1sv3g4.substack.com, 1 article featured in the Wazuh Ambassadors newsroom.
- [Daniel Oseghale](https://medium.com/@daniel_25366) - Medium profile, 1 article featured in the Wazuh Ambassadors newsroom.
- [Daniel Stanislowsky](https://clockworkcomputerip.blogspot.com/) - Blog at clockworkcomputerip.blogspot.com, 15 articles featured in the Wazuh Ambassadors newsroom.
- [Denis Rendler](https://root-security.eu/) - Blog at root-security.eu, 1 article featured in the Wazuh Ambassadors newsroom.
- [Dileep Kumar Chokkapu](https://medium.com/@dileepkumarchokkapu) - Medium profile, 2 articles featured in the Wazuh Ambassadors newsroom.
- [Dominik Sigl](https://isecng.de/) - Blog at isecng.de, 3 articles featured in the Wazuh Ambassadors newsroom.
- [Dzidula Gati](https://medium.com/@dzidulajubilee) - Medium profile, 4 articles featured in the Wazuh Ambassadors newsroom.
- [Efam Harris](https://medium.com/@efamharris) - Medium profile, 3 articles featured in the Wazuh Ambassadors newsroom.
- [Ekangwo Hernadez Ebolo](https://medium.com/@hsmiley) - Medium profile, 2 articles featured in the Wazuh Ambassadors newsroom.
- [Emmanuel Bama](https://emmanuelbama.net/) - Blog at emmanuelbama.net, 2 articles featured in the Wazuh Ambassadors newsroom.
- [Emmanuel Bama](https://idiaware.net/) - Blog at idiaware.net, 5 articles featured in the Wazuh Ambassadors newsroom.
- [Enes Ismaili](https://medium.com/@enes.ismaili) - Medium profile, 1 article featured in the Wazuh Ambassadors newsroom.
- [Enitan Ogungbade](https://medium.com/@ogungbadeenitan) - Medium profile, 2 articles featured in the Wazuh Ambassadors newsroom.
- [Enzo Manzanares](https://medium.com/@enzo.manzanares) - Medium profile, 1 article featured in the Wazuh Ambassadors newsroom.
- [Farhan Memon](https://guardiangaze.com/) - Blog at guardiangaze.com, 1 article featured in the Wazuh Ambassadors newsroom.
- [Farjaal Ahmad](https://medium.com/@farjaalahmad) - Medium profile, 1 article featured in the Wazuh Ambassadors newsroom.
- [Faruq Aremu](https://medium.com/@farukadewale) - Medium profile, 2 articles featured in the Wazuh Ambassadors newsroom.
- [Federico Fantini](https://blog.federicofantini.net/) - Blog at blog.federicofantini.net, 2 articles featured in the Wazuh Ambassadors newsroom.
- [Fellipe Morgado](https://medium.com/@fellipemorgado001) - Medium profile, 2 articles featured in the Wazuh Ambassadors newsroom.
- [Francisco Agballog](https://medium.com/@francisAg) - Medium profile, 1 article featured in the Wazuh Ambassadors newsroom.
- [Furkan Çağlar Çelik](https://caglar-celik.com/) - Blog at caglar-celik.com, 1 article featured in the Wazuh Ambassadors newsroom.
- [Hafiz Javid](https://trustscan.dev/) - Blog at trustscan.dev, 1 article featured in the Wazuh Ambassadors newsroom.
- [Hafiz Javid](https://wazuh.blogspot.com/) - Blog at wazuh.blogspot.com, 1 article featured in the Wazuh Ambassadors newsroom.
- [Hamza Jameel](https://medium.com/@dev.hamzaj) - Medium profile, 4 articles featured in the Wazuh Ambassadors newsroom.
- [Hanif Kurniawan](https://medium.com/@kurniawanhanif63) - Medium profile, 7 articles featured in the Wazuh Ambassadors newsroom.
- [Hazem Mohammed](https://medium.com/@hmohamed200) - Medium profile, 2 articles featured in the Wazuh Ambassadors newsroom.
- [Ikem Michael](https://medium.com/@ikem.michael1000) - Medium profile, 1 article featured in the Wazuh Ambassadors newsroom.
- [Imtiaz Rahman](https://imtiazrahman.com/) - Blog at imtiazrahman.com, 1 article featured in the Wazuh Ambassadors newsroom.
- [Ined Cardinot](https://medium.com/@inescgcardinot) - Medium profile, 1 article featured in the Wazuh Ambassadors newsroom.
- [Ismael Barrantes](https://medium.com/@ismapersonal97) - Medium profile, 6 articles featured in the Wazuh Ambassadors newsroom.
- [Ismail Hakim](https://medium.com/@ismail-hakim) - Medium profile, 2 articles featured in the Wazuh Ambassadors newsroom.
- [Jakub Zielinski](https://medium.com/@cylenth) - Medium profile, 2 articles featured in the Wazuh Ambassadors newsroom.
- [James Nyamu](https://medium.com/@washira09) - Medium profile, 1 article featured in the Wazuh Ambassadors newsroom.
- [Jędrzej Boguszyński](https://jedrzejboguszynski.pl/) - Blog at jedrzejboguszynski.pl, 9 articles featured in the Wazuh Ambassadors newsroom.
- [Joel Yang](https://medium.com/@yzw.joe) - Medium profile, 4 articles featured in the Wazuh Ambassadors newsroom.
- [John Lee](https://medium.com/@johnsunglee) - Medium profile, 2 articles featured in the Wazuh Ambassadors newsroom.
- [Jonathan Daniels](https://medium.com/@masjter) - Medium profile, 2 articles featured in the Wazuh Ambassadors newsroom.
- [Jose Raeiro](https://joseraeiro.github.io/) - Blog at joseraeiro.github.io, 1 article featured in the Wazuh Ambassadors newsroom.
- [Juan Matthews Rebello Santos](https://juanmathewsrebellosantos.com/) - Blog at juanmathewsrebellosantos.com, 1 article featured in the Wazuh Ambassadors newsroom.
- [Karan Khatri](https://karankessy.github.io/) - Blog at karankessy.github.io, 1 article featured in the Wazuh Ambassadors newsroom.
- [Karan Khatri Regmi](https://karanregmi.com.np/) - Blog at karanregmi.com.np, 1 article featured in the Wazuh Ambassadors newsroom.
- [Kat Fitzgerald](https://sashatheflamingo.xyz/) - Blog at sashatheflamingo.xyz, 1 article featured in the Wazuh Ambassadors newsroom.
- [Kevin Branch](https://bluewolfninja.com/) - Blog at bluewolfninja.com, 8 articles featured in the Wazuh Ambassadors newsroom.
- [Killian Prin-Abeil](https://aukfood.fr/) - Blog at aukfood.fr, 5 articles featured in the Wazuh Ambassadors newsroom.
- [Kislley Rodrigues](https://medium.com/@m0us3r) - Medium profile, 1 article featured in the Wazuh Ambassadors newsroom.
- [Leandro Fernandes Correia](https://medium.com/@leo-correia) - Medium profile, 1 article featured in the Wazuh Ambassadors newsroom.
- [Ludovic Gildas Doamba](https://medium.com/@ludovic.doamba) - Medium profile, 5 articles featured in the Wazuh Ambassadors newsroom.
- [Luis López](https://medium.com/@networkingenier) - Medium profile, 3 articles featured in the Wazuh Ambassadors newsroom.
- [Luis López](https://medium.com/@llopez870407) - Medium profile, 3 articles featured in the Wazuh Ambassadors newsroom.
- [Marco Teixeira](https://medium.com/@mjvmst) - Medium profile, 5 articles featured in the Wazuh Ambassadors newsroom.
- [Maryam Liaqat](https://medium.com/@maryamliaqat4583) - Medium profile, 9 articles featured in the Wazuh Ambassadors newsroom.
- [Mattias Hemmingsson](https://lifeandshell.com/) - Blog at lifeandshell.com, 2 articles featured in the Wazuh Ambassadors newsroom.
- [Mércio Manjor](https://medium.com/@mercio.manjor) - Medium profile, 1 article featured in the Wazuh Ambassadors newsroom.
- [Michael Muenz](https://wazuh-blog.max-it.de/) - Blog at wazuh-blog.max-it.de, 15 articles featured in the Wazuh Ambassadors newsroom.
- [Michał Bednarczyk](https://medium.com/@michb2000.mb) - Medium profile, 10 articles featured in the Wazuh Ambassadors newsroom.
- [Michelle G. Roblero](https://roblero-consulting.gitbook.io/) - Blog at roblero-consulting.gitbook.io, 1 article featured in the Wazuh Ambassadors newsroom.
- [Mohammed Abbood](https://medium.com/@pash.sec) - Medium profile, 1 article featured in the Wazuh Ambassadors newsroom.
- [Muhammad Ahmed](https://medium.com/@mirzaahmedmughal85) - Medium profile, 1 article featured in the Wazuh Ambassadors newsroom.
- [Muhammad Akmalul Hakim Samsuri](https://medium.com/@akimakmal88) - Medium profile, 2 articles featured in the Wazuh Ambassadors newsroom.
- [Muhammad Ali](https://medium.com/@alijan262000) - Medium profile, 3 articles featured in the Wazuh Ambassadors newsroom.
- [Muhammad Jawwad](https://medium.com/@muhammadjawwadsiddiquii) - Medium profile, 1 article featured in the Wazuh Ambassadors newsroom.
- [Muhammad Moiz Uddin Rafay](https://medium.com/@moizuddinrafay) - Medium profile, 12 articles featured in the Wazuh Ambassadors newsroom.
- [Muhammad Shoaib Shafqat](https://medium.com/@mshoaibshafqat2) - Medium profile, 2 articles featured in the Wazuh Ambassadors newsroom.
- [Muhammad Usman](https://medium.com/@usmannazir5503) - Medium profile, 2 articles featured in the Wazuh Ambassadors newsroom.
- [Mulayam Yadav](https://certbar.com/) - Blog at certbar.com, 3 articles featured in the Wazuh Ambassadors newsroom.
- [Muneer Baig](https://medium.com/@muneer.baig) - Medium profile, 1 article featured in the Wazuh Ambassadors newsroom.
- [Nadim Saliby](https://blog.nadimjsaliby.com/) - Blog at blog.nadimjsaliby.com, 3 articles featured in the Wazuh Ambassadors newsroom.
- [Oliver Roca](https://alistoir.com/) - Blog at alistoir.com, 3 articles featured in the Wazuh Ambassadors newsroom.
- [Phong Xuan](https://news.fmisec.com/) - Blog at news.fmisec.com, 3 articles featured in the Wazuh Ambassadors newsroom.
- [Raj Vira](https://medium.com/@raj.vira2112) - Medium profile, 3 articles featured in the Wazuh Ambassadors newsroom.
- [Raphael Tchonkoteu](https://medium.com/@tchonkoteur20) - Medium profile, 2 articles featured in the Wazuh Ambassadors newsroom.
- [Raphooko Phooko](https://medium.com/@raphooko_3) - Medium profile, 1 article featured in the Wazuh Ambassadors newsroom.
- [Rizky Sandy](https://medium.com/@r-sandy) - Medium profile, 3 articles featured in the Wazuh Ambassadors newsroom.
- [Rodrigo Pereira](https://medium.com/@rodrigosec) - Medium profile, 2 articles featured in the Wazuh Ambassadors newsroom.
- [Rupesh Sharma](https://medium.com/@rupesharma203) - Medium profile, 1 article featured in the Wazuh Ambassadors newsroom.
- [Ryad Serkouh](https://medium.com/@serkouhryad) - Medium profile, 2 articles featured in the Wazuh Ambassadors newsroom.
- [Saif Ullah](https://medium.com/@saifsocx) - Medium profile, 7 articles featured in the Wazuh Ambassadors newsroom.
- [Sipho Kao](https://medium.com/@kaosipho1) - Medium profile, 5 articles featured in the Wazuh Ambassadors newsroom.
- [Soban Malik](https://medium.com/@sobanmalikk) - Medium profile, 1 article featured in the Wazuh Ambassadors newsroom.
- [Stephan Wenderlich](https://gray-hat-it-security-consulting.de/) - Blog at gray-hat-it-security-consulting.de, 8 articles featured in the Wazuh Ambassadors newsroom.
- [Suvadip Ghosh](https://medium.com/@ghoshsuvadip02) - Medium profile, 2 articles featured in the Wazuh Ambassadors newsroom.
- [Syed Golam Abid](https://docs.alsechemist.com/) - Blog at docs.alsechemist.com, 3 articles featured in the Wazuh Ambassadors newsroom.
- [Syed Jawad Ali Shah](https://medium.com/@syedjawad07) - Medium profile, 15 articles featured in the Wazuh Ambassadors newsroom.
- [Thierry Rolland](https://medium.com/@thierrymballa) - Medium profile, 1 article featured in the Wazuh Ambassadors newsroom.
- [Vigan Bytyqi](https://samsploit1.github.io/) - Blog at samsploit1.github.io, 3 articles featured in the Wazuh Ambassadors newsroom.
- [Vigan Bytyqi](https://medium.com/@samsploit) - Medium profile, 2 articles featured in the Wazuh Ambassadors newsroom.
- [Vigan Bytyqi](https://medium.com/@vigan_93792) - Medium profile, 1 article featured in the Wazuh Ambassadors newsroom.
- [Vladimir Jerbić](https://medium.com/@vjerbic) - Medium profile, 1 article featured in the Wazuh Ambassadors newsroom.
- [Wendell Nyarko](https://medium.com/@wendell916) - Medium profile, 1 article featured in the Wazuh Ambassadors newsroom.
- [Wenupa De Silva](https://medium.com/@Wen19z) - Medium profile, 1 article featured in the Wazuh Ambassadors newsroom.
- [Wilklins Nyatteng](https://medium.com/@wilklins) - Medium profile, 5 articles featured in the Wazuh Ambassadors newsroom.
- [William Weber](https://medium.com/@wweber993) - Medium profile, 1 article featured in the Wazuh Ambassadors newsroom.
- [Xavier Martens](https://xameco.be/) - Blog at xameco.be, 1 article featured in the Wazuh Ambassadors newsroom.
- [Yannick Siewe](https://medium.com/@yannicksiewe) - Medium profile, 1 article featured in the Wazuh Ambassadors newsroom.
- [Yash Patel](https://medium.com/@yashpateld22d) - Medium profile, 6 articles featured in the Wazuh Ambassadors newsroom.
- [Yazin Alhamdi](https://libyacloud.ly/) - Blog at libyacloud.ly, 1 article featured in the Wazuh Ambassadors newsroom.
- [Yunus Emre ÇOBAN](https://medium.com/@yunusmrcoban) - Medium profile, 1 article featured in the Wazuh Ambassadors newsroom.
- [Yuriy Medvedev](https://blog.pytoshka.me/) - Blog at blog.pytoshka.me, 6 articles featured in the Wazuh Ambassadors newsroom.
- [Zafer Balkan](https://zaferbalkan.com/) - Blog at zaferbalkan.com, 12 articles featured in the Wazuh Ambassadors newsroom.
<!-- ambassadors:end -->

## Community

- 🟢 [Wazuh Community](https://wazuh.com/community/) - Slack workspace, mailing list and forums.
- 🟢 [GitHub Discussions](https://github.com/wazuh/wazuh/discussions) - Q&A and feature requests.
- 🟢 [GitHub Organization](https://github.com/wazuh) - Source code of all Wazuh components.
- 🟢 [Professional Support](https://wazuh.com/services/professional-support/) - SLA-backed support services.

## Examples

This repository includes deployment templates and examples:

- [Docker Compose](https://github.com/adampielak/awesome-wazuh/tree/main/examples/docker-compose) - Single and multi-node setups.
- [Terraform](https://github.com/adampielak/awesome-wazuh/tree/main/examples/terraform) - Infrastructure-as-code templates (OpenTofu compatible).
- [Ansible](https://github.com/adampielak/awesome-wazuh/tree/main/examples/ansible) - Multi-host playbooks.

## Contributing

Suggestions are welcome. Read the [contribution guidelines](CONTRIBUTING.md) first, then open a pull request or an [issue](https://github.com/adampielak/awesome-wazuh/issues). Entries that should not be added by the daily update go to [`data/excluded.txt`](data/excluded.txt).

Maintained by Adam Pielak ([@adampielak](https://github.com/adampielak), tick@wazuh.blog).

## Footnotes

- 🟢 = official Wazuh resource, 🟡 = community resource.
- Repositories that were archived or deleted are moved to [ARCHIVED.md](ARCHIVED.md).
- This list is a fork of [TTlab-Research/awesome-wazuh](https://github.com/TTlab-Research/awesome-wazuh), started by Franco Tampieri ([TTlab](https://ttlab.it/)). Thank you for the original list and the research behind it.
