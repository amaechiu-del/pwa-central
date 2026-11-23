# DomisLink PWA Central

Shared, framework-agnostic Progressive Web App standards and utilities for DomisLink applications.

## Principles

- Each application owns its manifest, install identity and same-origin service worker.
- OneLink remains the authentication provider; this repository never stores credentials or sessions.
- Never cache authentication responses, personal data, payment responses or private API traffic.
- Updates require application-controlled activation; do not force reload during critical workflows.
- Prefer zero-cost tooling and no production infrastructure until approved.

## Milestones

1. Shared manifest validation, safe install/update helpers, offline fallback patterns and tests.
2. Application registry and branding assets with CI compliance checks.
3. Optional Cloudflare-based dashboard and controlled release announcements.
4. Pilot integration with DomisLink Headquarters and Church, then wider adoption.

## Integration

Consume versioned shared packages or copy audited templates into each application. Do not register a central cross-origin service worker: browser service workers are origin- and scope-bound.

## Security

Use network-only for sign-in, checkout, account, and sensitive APIs. Offline caching must be opt-in per app, limited to public static assets. No secrets in repository or manifests.
