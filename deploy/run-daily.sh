#!/usr/bin/env bash
# Daily update of the list: sync with origin, run the updater, lint, commit, push.
# The clone is untrusted input (anyone can send a pull request). The updater and
# awesome-lint are pinned copies in $BOT_DIR, and bun never runs with the clone
# as its working directory, so bunfig.toml, .env or package.json in the
# repository cannot change what runs on the server.
set -euo pipefail

BOT_DIR="${BOT_DIR:-$HOME/awesome-wazuh-bot}"
REPO="$BOT_DIR/repo"
BUN="${BUN:-$HOME/.bun/bin/bun}"
LINT="$BOT_DIR/lint/node_modules/awesome-lint/cli.js"
KEY="${DEPLOY_KEY:-$HOME/.ssh/awesome_wazuh_deploy}"
BRANCH="${BRANCH:-main}"
DRY_RUN="${DRY_RUN:-0}"
export GIT_SSH_COMMAND="ssh -i $KEY -o IdentitiesOnly=yes"

git -C "$REPO" fetch --quiet origin "$BRANCH"
git -C "$REPO" checkout --quiet "$BRANCH"
git -C "$REPO" reset --quiet --hard "origin/$BRANCH"

# The updater writes these files: refuse symlinks that could point outside the clone.
for f in README.md ARCHIVED.md data/excluded.txt; do
  if [[ -L "$REPO/$f" || ! -f "$REPO/$f" ]]; then
    echo "refusing to run: $f is not a regular file" >&2
    exit 1
  fi
done

cd "$BOT_DIR"
summary="$("$BUN" --no-env-file bin/update.ts --repo-dir "$REPO")"
echo "$summary"

if git -C "$REPO" diff --quiet -- README.md ARCHIVED.md; then
  echo "no changes"
  exit 0
fi

# Never publish a list that fails the awesome-lint rules.
"$BUN" --no-env-file "$LINT" "$REPO/README.md"

added=$(jq '.added | length' <<<"$summary")
gone=$(jq '(.archived | length) + (.removed | length)' <<<"$summary")
renamed=$(jq '.renamed | length' <<<"$summary")
msg="Daily update: +$added new, -$gone archived or removed, $renamed renamed"

if [[ "$DRY_RUN" == "1" ]]; then
  echo "dry run, not committing: $msg"
  git -C "$REPO" --no-pager diff --stat
  git -C "$REPO" reset --quiet --hard "origin/$BRANCH"
  exit 0
fi

git -C "$REPO" add README.md ARCHIVED.md
git -C "$REPO" -c user.name="Adam Pielak" -c user.email="tick@wazuh.blog" commit --quiet -m "$msg"
git -C "$REPO" push --quiet origin "$BRANCH"
echo "pushed: $msg"
