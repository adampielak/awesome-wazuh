# Daily Update Deployment

The list is updated once a day by [`scripts/update.ts`](../scripts/update.ts), run from a systemd user timer on a Linux server.

## Files

- [`run-daily.sh`](run-daily.sh) - resets the clone to `origin/main`, runs the updater, checks the result with `awesome-lint`, commits as the maintainer and pushes. `DRY_RUN=1` runs everything except the commit and push.
- [`awesome-wazuh-update.service`](awesome-wazuh-update.service), [`awesome-wazuh-update.timer`](awesome-wazuh-update.timer) - systemd user units, daily at 05:30 local time plus up to 20 minutes of random delay. `Persistent=true` catches up on a missed run.
- [`install.sh`](install.sh) - copies the updater and the run script to `~/awesome-wazuh-bot/bin`, installs awesome-lint 2.3.0 in `~/awesome-wazuh-bot/lint`, installs and enables the units.

The clone is untrusted input: anyone can send a pull request. The server runs pinned copies of the updater and awesome-lint, never runs Bun with the clone as its working directory (so `bunfig.toml`, `.env` or `package.json` from the repository are not loaded), and refuses to run when `README.md`, `ARCHIVED.md` or `data/excluded.txt` is a symlink. A change to `scripts/update.ts` reaches the server only when `install.sh` is run again, after review.

## Layout on the Server

```text
~/awesome-wazuh-bot/
  bin/update.ts       pinned updater
  bin/run-daily.sh    daily job
  lint/               pinned awesome-lint
  repo/               clone of adampielak/awesome-wazuh, pushes with a deploy key
~/.config/systemd/user/awesome-wazuh-update.{service,timer}
```

## Setup

Requirements: `git`, `jq`, [Bun](https://bun.sh/) in `~/.bun/bin`, lingering enabled for the user (`loginctl enable-linger`).

```sh
# Deploy key with write access, used only for this repository.
ssh-keygen -t ed25519 -N "" -C "awesome-wazuh-update" -f ~/.ssh/awesome_wazuh_deploy
gh repo deploy-key add ~/.ssh/awesome_wazuh_deploy.pub --repo adampielak/awesome-wazuh --allow-write --title "daily update"

GIT_SSH_COMMAND="ssh -i ~/.ssh/awesome_wazuh_deploy -o IdentitiesOnly=yes" \
  git clone git@github.com:adampielak/awesome-wazuh.git ~/awesome-wazuh-bot/repo
~/awesome-wazuh-bot/repo/deploy/install.sh            # ENABLE_TIMER=0 installs without enabling the timer
```

The updater works without a GitHub token (search API limit of 10 requests per minute, a run takes about 5 minutes). `GITHUB_TOKEN` in the environment raises the limit; a fine-grained token without any permissions is enough.

## Operation

```sh
systemctl --user list-timers awesome-wazuh-update.timer
systemctl --user start awesome-wazuh-update.service    # run now
journalctl --user -u awesome-wazuh-update.service -n 50
DRY_RUN=1 ~/awesome-wazuh-bot/bin/run-daily.sh          # no commit, no push
```

Rollback: `systemctl --user disable --now awesome-wazuh-update.timer`, then revert the commit on GitHub.
