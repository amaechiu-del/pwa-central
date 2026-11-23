# Control Centre integration — Milestone 12

PWA Central is the source of truth for shared PWA policy and compliance evidence. DomisLink Control Centre is the intended administrative interface. Do not build a second dashboard.

## Data contract
Run `node scripts/export-control-feed.mjs` to generate `reports/control-centre-feed.json`. The feed is public metadata only: app ID, name, origin, repository, lifecycle status and tri-state PWA checks. Unknown is never converted into pass. No secrets, tokens, customer data or device identifiers.

## Consumption
Control Centre may download the versioned GitHub Actions artifact with read-only GitHub permissions, validate `schemaVersion` and `source`, and display the most recent verified report. A future authenticated Control Centre endpoint may ingest the same JSON. Do not publish a write endpoint or provision new infrastructure until the Control Centre repository and access policy are verified.

## Current blocker
The expected repository `amaechiu-del/domislink-control` was not found in the available GitHub repository search at implementation time. The integration contract is prepared, but no Control Centre code has been modified. Reconcile existing repository names before creating anything new.
