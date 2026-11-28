# Wazuh Examples & Test Environments

Ready-to-use templates and configurations for deploying Wazuh in various environments.

## 📁 Directory Structure

```
examples/
├── docker-compose/        # Container-based deployments
├── terraform/             # Infrastructure-as-Code (Terraform/OpenTofu)
├── ansible/              # Multi-host deployment playbooks
└── README.md             # This file
```

---

## 🐳 Docker Compose

**Best for**: Local development, testing, POC demonstrations

### Quick Start
```bash
cd examples/docker-compose
# Set your own passwords first; .env is git-ignored
printf 'INDEXER_PASSWORD=%s\nWAZUH_API_PASSWORD=%s\n' '<indexer-password>' '<api-password>' > .env
docker-compose up -d
```

Use 12 to 64 characters with at least one uppercase letter, one lowercase letter, one digit and one of `. + -`. That satisfies the [password rules](https://documentation.wazuh.com/current/user-manual/user-administration/password-management.html) of Wazuh 4.x and 5.0. Compose refuses to start while either variable is missing.

### Access
- **Dashboard**: https://localhost:443
- **Credentials**: `admin` and the `INDEXER_PASSWORD` from `.env`
- **API**: https://localhost:55000

### Features
- ✅ Wazuh Manager
- ✅ Wazuh Indexer (OpenSearch)
- ✅ Wazuh Dashboard
- ✅ Complete stack in 30 seconds

### Requirements
- Docker Desktop or Docker Engine
- 4GB RAM minimum
- 20GB disk space

### Notes
- Single-node setup
- For multi-node: See [wazuh/wazuh-docker](https://github.com/wazuh/wazuh-docker)
- SSL certificates auto-generated

---

## 🏗️ Terraform / OpenTofu

**Best for**: Infrastructure-as-Code, mass agent deployment, GitOps

### Compatibility
✅ **Works with Terraform and OpenTofu** - use whichever you prefer

### Quick Start
```bash
cd examples/terraform

# Using Terraform
terraform init
terraform plan
terraform apply

# OR using OpenTofu
tofu init
tofu plan
tofu apply
```

### Features
- ✅ Agent group creation
- ✅ Mass agent provisioning
- ✅ Dynamic agent naming
- ✅ State management

### Provider
- **Source**: `grulicht/wazuh` (community-maintained)
- **Terraform Registry**: https://registry.terraform.io/providers/grulicht/wazuh
- **GitHub**: https://github.com/grulicht/terraform-provider-wazuh

### Variables

Create `terraform.tfvars`:
```hcl
wazuh_address  = "wazuh.example.com"
wazuh_username = "admin"
wazuh_password = "your-secure-password"
agent_count    = 10
```

### Requirements
- Terraform >= 1.0 OR OpenTofu >= 1.6
- Running Wazuh Manager
- API credentials

### Notes
- ⚠️ No official Wazuh provider yet ([request](https://github.com/wazuh/wazuh/issues/20176))
- Community provider actively maintained
- Perfect for GitOps workflows

---

## 🔧 Ansible

**Best for**: Multi-host deployment, configuration management, existing Ansible infrastructure

### Quick Start
```bash
cd examples/ansible

# Create hosts file
cat > hosts.ini <<EOF
[wazuh_agents]
server1.example.com wazuh_agent_name=server1
server2.example.com wazuh_agent_name=server2
server3.example.com wazuh_agent_name=server3

[wazuh_agents:vars]
ansible_user=ubuntu
wazuh_manager_ip=10.0.0.1
EOF

# Run playbook
ansible-playbook -i hosts.ini playbook.yml
```

### Features
- ✅ Multi-OS support (Debian, RedHat, Ubuntu, CentOS)
- ✅ Repository management
- ✅ Agent installation & configuration
- ✅ Service management
- ✅ Health verification

### Supported Operating Systems
- ✅ Ubuntu 18.04+
- ✅ Debian 9+
- ✅ CentOS 7+
- ✅ Red Hat 7+
- ✅ Amazon Linux 2

### Requirements
- Ansible 2.10+
- SSH access to target hosts
- Sudo privileges
- Running Wazuh Manager

### Official Resources
- **GitHub**: https://github.com/wazuh/wazuh-ansible
- **Docs**: https://documentation.wazuh.com/current/deployment-options/deploying-with-ansible/index.html

### Notes
- Use release branches for production
- Main branch may contain experimental features
- Officially maintained by Wazuh

---

## 🚀 Deployment Scenarios

### Scenario 1: Quick Dev/Test (Docker Compose)
**Time**: 5 minutes | **Complexity**: Low
```bash
cd examples/docker-compose
docker-compose up
```

### Scenario 2: Multi-Server Lab (Ansible)
**Time**: 15 minutes | **Complexity**: Medium
```bash
cd examples/ansible
# Update hosts.ini
ansible-playbook -i hosts.ini playbook.yml
```

### Scenario 3: Production IaC (Terraform)
**Time**: 20 minutes | **Complexity**: High
```bash
cd examples/terraform
terraform apply
```

---

## 📊 Resource Requirements

| Method | CPU | Memory | Disk | Network |
|--------|-----|--------|------|---------|
| **Docker Compose** | 2+ core | 4GB+ | 20GB | Local/Remote |
| **Ansible** | 0.5 core/agent | 100MB/agent | 500MB/agent | SSH |
| **Terraform** | N/A | N/A | N/A | API |

---

## 🔒 Security Notes

### Credentials
```bash
# DO NOT hardcode passwords
# Use environment variables or secrets management:

# Option 1: Environment variables
export TF_VAR_wazuh_password=$(op item get "Wazuh Password" --fields password)

# Option 2: 1Password integration
op run --no-masking -- terraform apply

# Option 3: Vault
vault kv get secret/wazuh
```

### SSL/TLS
- ✅ Docker Compose: Self-signed (auto-generated)
- ✅ Ansible: Configure in ossec.conf
- ✅ Terraform: Managed by Wazuh API

### Network Security
- ✅ Use VPC/subnets
- ✅ Restrict SSH (Ansible)
- ✅ Use private IPs for agents
- ✅ Enable firewall rules

---

## 🐛 Troubleshooting

### Docker Compose Won't Start
```bash
# Check logs
docker-compose logs wazuh
docker-compose logs wazuh-indexer

# Rebuild images
docker-compose up --build
```

### Ansible Connection Issues
```bash
# Test connectivity
ansible all -i hosts.ini -m ping

# Check SSH
ssh -v ubuntu@server1.example.com

# Verify sudo
ansible all -i hosts.ini -m shell -a "whoami" -b
```

### Terraform Errors
```bash
# Enable debug logging
export TF_LOG=DEBUG
terraform apply

# Validate configuration
terraform validate
terraform fmt -recursive
```

---

## 📚 Additional Resources

- **Official Wazuh Docker**: https://github.com/wazuh/wazuh-docker
- **Wazuh Kubernetes**: https://github.com/wazuh/wazuh-kubernetes
- **Wazuh Ansible**: https://github.com/wazuh/wazuh-ansible
- **Terraform Provider**: https://github.com/grulicht/terraform-provider-wazuh
- **Deployment Guide**: ../docs/DEPLOYMENT_GUIDE.md

---

## 💡 Tips

1. **Start simple**: Use Docker Compose to learn
2. **Then automate**: Move to Terraform/Ansible
3. **Mix and match**: Docker for dashboard, Ansible for agents
4. **Version control**: Commit IaC to git
5. **GitOps**: Use Terraform in CI/CD pipeline

---

**Last Updated**: January 31, 2026
**Status**: All examples tested ✅
