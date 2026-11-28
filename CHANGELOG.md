# Changelog

## 2026-11-14

- Fork of TTlab-Research/awesome-wazuh taken over by Adam Pielak; contact points in README.md, CONTRIBUTING.md, CONTRIBUTORS.md and docs/ changed.
- README.md rebuilt to the awesome-lint rules: title, Contents, entry format, Footnotes with fork credit; duplicate and dead links removed.
- Wazuh.blog added under Guides & Tutorials > Blogs.
- Ambassador Blogs section, built from the Wazuh Ambassadors newsroom.
- ARCHIVED.md for archived and deleted repositories; data/excluded.txt for skipped repositories.
- scripts/update.ts with tests: daily health check, discovery of new repositories, ambassador blogs.
- deploy/: daily job, systemd user units and installer.
- 51 community repositories added from the first discovery run, reviewed by hand.

## 2026-11-14 (2)

- Adam Pielak (wazuh.blog) added to Ambassador Blogs as a fixed entry in scripts/update.ts (EXTRA_AMBASSADORS), not featured in the newsroom.

## 2026-11-28

- scripts/update.ts: the ambassador refresh fetched a CloudFront copy of the newsroom up to 3 days old, whose WordPress nonce had expired, so admin-ajax returned 403 and only the first 9 of ~480 posts were parsed (refresh skipped on most days). The newsroom request now carries a cache-busting query string; a failed admin-ajax page is logged with its status.
