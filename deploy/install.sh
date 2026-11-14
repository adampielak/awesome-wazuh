#!/usr/bin/env bash
# Install or upgrade the daily updater for the current user (systemd user units).
# Run from a checkout of this repository on the server: ./deploy/install.sh
# Requires: git, jq, bun in ~/.bun/bin, lingering enabled (loginctl enable-linger),
# a clone of the repository in $BOT_DIR/repo and the deploy key ~/.ssh/awesome_wazuh_deploy.
set -euo pipefail

SRC="$(cd "$(dirname "$0")/.." && pwd)"
BOT_DIR="${BOT_DIR:-$HOME/awesome-wazuh-bot}"
UNITS="$HOME/.config/systemd/user"

mkdir -p "$BOT_DIR/bin" "$UNITS"
install -m 0644 "$SRC/scripts/update.ts" "$BOT_DIR/bin/update.ts"
install -m 0755 "$SRC/deploy/run-daily.sh" "$BOT_DIR/bin/run-daily.sh"

# Pinned awesome-lint, outside the clone.
mkdir -p "$BOT_DIR/lint"
[[ -f "$BOT_DIR/lint/package.json" ]] || printf '{"private": true}\n' > "$BOT_DIR/lint/package.json"
(cd "$BOT_DIR/lint" && "$HOME/.bun/bin/bun" add --exact awesome-lint@2.3.0)
install -m 0644 "$SRC/deploy/awesome-wazuh-update.service" "$SRC/deploy/awesome-wazuh-update.timer" "$UNITS/"

systemd-analyze --user verify "$UNITS/awesome-wazuh-update.service" "$UNITS/awesome-wazuh-update.timer"
systemctl --user daemon-reload
if [[ "${ENABLE_TIMER:-1}" == "1" ]]; then
  systemctl --user enable --now awesome-wazuh-update.timer
fi
systemctl --user list-timers awesome-wazuh-update.timer --no-pager
