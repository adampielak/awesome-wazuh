# Contribution Guidelines

Thank you for helping to improve this list. Please read these guidelines before you open a pull request.

## Inclusion Criteria

An entry is accepted when it:

- Is directly related to Wazuh (manager, agent, indexer, dashboard, rules, integrations, operations).
- Works and is documented: a README that explains what it does and how to use it.
- Is maintained. Archived repositories and dead links are not listed in the main list.
- Is not a duplicate of an existing entry.
- Is free to use. Commercial products are accepted only with a substantial free or open source edition.

The daily update applies the same rules automatically to GitHub repositories:

- `wazuh` in the name or description (a `wazuh` topic alone is not enough),
- at least 10 stars,
- a push in the last 365 days,
- not a fork, not archived,
- a usable English description (not a list of tags, not in another language),
- not offensive tooling (exploits, loaders, evasion), unless it is detection content.

Repositories of the official `wazuh` organization are curated by hand.

## Entry Format

```markdown
- 🟡 [Name](https://link) - Description.
```

- 🟢 for official Wazuh resources, 🟡 for community resources.
- The link and the description are separated by ` - `.
- The description starts with an uppercase letter and ends with a period.
- Keep it to one sentence. Say what the resource does, not how good it is.
- Use the correct names: Wazuh, OpenSearch, Kubernetes, Terraform, Ansible, GitHub.
- Add new entries at the bottom of the matching section.

## How to Contribute

1. Fork the repository and create a branch: `git checkout -b add/resource-name`.
2. Add the entry in the right section of `README.md`.
3. Check the list: `bunx awesome-lint README.md`.
4. Open a pull request titled `Add Name of Resource`. In the description, say why the resource belongs on the list.

One pull request per entry, unless the entries are closely related.

## Removing or Correcting an Entry

- Broken link, outdated description, wrong section: open a pull request with the fix or an [issue](https://github.com/adampielak/awesome-wazuh/issues).
- An entry that the daily update keeps adding but should not be on the list: add `owner/repo` (or just `owner`) to [`data/excluded.txt`](data/excluded.txt) in a pull request, with a short reason as a `#` comment.
- Archived or deleted repositories are moved to [ARCHIVED.md](ARCHIVED.md) automatically.

## Daily Update

[`scripts/update.ts`](scripts/update.ts) runs once a day. It:

1. Checks every listed GitHub repository: archived or deleted ones go to `ARCHIVED.md`, renamed ones get the new URL.
2. Searches GitHub for new repositories that meet the inclusion criteria and appends them to the matching section.
3. Rebuilds the [Ambassador Blogs](README.md#ambassador-blogs) section from the official [Wazuh Ambassadors newsroom](https://wazuh.com/newsroom/source/ambassadors/).

The result is checked with `awesome-lint` before it is committed. Automatic additions are reviewed by hand and moved or reworded when needed, so a pull request that improves an automatic entry is welcome.

## Code of Conduct

Be respectful and constructive. Report problems to the maintainer.

## Maintainer

Adam Pielak ([@adampielak](https://github.com/adampielak)), tick@wazuh.blog.
