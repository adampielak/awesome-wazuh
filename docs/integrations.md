# Wazuh Integrations

Curated list of official and community integrations for alerting, ticketing, threat intelligence, and orchestration.

## Integration Categories

### Alerting & Notification

- 🔴 [Slack Integration](https://documentation.wazuh.com/current/user-manual/manager/manual-email-report.html#slack) - Real-time team notifications
- 🔴 [Microsoft Teams](https://documentation.wazuh.com/current/user-manual/manager/manual-email-report.html#teams) - Enterprise team alerts
- 🔴 [PagerDuty Integration](https://documentation.wazuh.com/current/user-manual/manager/manual-email-report.html#pagerduty) - On-call incident escalation
- 🔴 [Email Integration](https://documentation.wazuh.com/current/user-manual/manager/manual-email-report.html) - Traditional email alerts

---

### Ticketing & Issue Management

- 🔴 [Jira Integration](https://documentation.wazuh.com/current/user-manual/manager/manual-email-report.html#jira) - Automated ticket creation
- 🔴 [ServiceNow Integration](https://documentation.wazuh.com/current/user-manual/manager/manual-email-report.html#servicenow) - Enterprise ITSM integration
- 🟡 [GitHub Issues](https://github.com/wazuh/wazuh) - Community issue tracking

---

### Threat Intelligence & Enrichment

- 🔴 [VirusTotal Integration](https://documentation.wazuh.com/current/user-manual/manager/manual-email-report.html#virustotal) - File hash analysis and reputation
- 🔴 [Maltiverse Integration](https://documentation.wazuh.com/current/user-manual/manager/manual-email-report.html) - IP/domain reputation lookup
- 🟡 [AlienVault OTX](https://otx.alienvault.com/) - Open threat intelligence exchange

---

### Cloud Platforms

- 🔴 [AWS Integration](https://documentation.wazuh.com/current/user-manual/capabilities/cloud-security/aws/) - CloudTrail, GuardDuty, Security Hub
- 🔴 [Azure Integration](https://documentation.wazuh.com/current/user-manual/capabilities/cloud-security/azure/) - Activity Logs, Sentinel, Defender
- 🔴 [GCP Integration](https://documentation.wazuh.com/current/user-manual/capabilities/cloud-security/gcp/) - Cloud Audit Logs, Security Command Center
- 🔴 [Wazuh Cloud (SaaS)](https://cloud.wazuh.com/) - Fully managed Wazuh platform

---

### SOAR & Orchestration

- 🔴 [Custom Webhooks](https://documentation.wazuh.com/current/user-manual/manager/manual-email-report.html#custom-integrations) - Generic REST API integration
- 🟡 [Shuffle SOAR](https://shuffler.io/) - Workflow automation platform
- 🟡 [Splunk Phantom](https://www.splunk.com/en_us/products/splunk-soar.html) - Enterprise SOAR
- 🟡 [Demisto/XSOAR](https://www.paloaltonetworks.com/cortex/xsoar) - Palo Alto SOAR platform

---

## Official Integration Documentation

- 🔴 [All Integrations Guide](https://documentation.wazuh.com/current/user-manual/manager/manual-email-report.html) - Complete integration reference
- 🔴 [Custom Integrations](https://documentation.wazuh.com/current/user-manual/manager/manual-email-report.html#custom-integrations) - Webhook and API patterns
- 🔴 [External API Integrations](https://documentation.wazuh.com/current/user-manual/manager/integration-with-external-apis.html) - Advanced API patterns

---

## Community Integrations

- 🟢 [Community Integrations Repo](https://github.com/wazuh-wazuh-integrations) - Community-contributed integrations
- 🟢 [Community Discussions](https://github.com/wazuh/wazuh/discussions) - Integration ideas and sharing
- 🟢 [Community Slack](https://wazuh.com/community/) - Real-time support and examples

---

## Integration Decision Matrix

| Integration | Type | Complexity | Best For |
|------------|------|-----------|----------|
| Slack | Notification | Low | Team alerts |
| Teams | Notification | Low | Enterprise |
| PagerDuty | Alerting | Medium | On-call escalation |
| Jira | Ticketing | Medium | Agile teams |
| ServiceNow | ITSM | High | Enterprise ITSM |
| VirusTotal | Enrichment | Low | Malware analysis |
| AWS | Cloud | High | AWS environments |
| Azure | Cloud | High | Azure environments |
| Shuffle | SOAR | High | Complex workflows |
| Custom API | Generic | Medium | Custom systems |

---

**Last updated**: February 2, 2026
**Questions and corrections**: [GitHub issues](https://github.com/adampielak/awesome-wazuh/issues)
