# Branding and offline caching policy

## Brand metadata
Each app owns its display name, icon artwork, theme color, manifest and screenshots. Do not overwrite the existing DomisLink Headquarters visual design. Provide 192x192 and 512x512 PNG icons and a maskable variant when available.

## Offline policy
Only explicitly enumerated public static assets may be precached by an application-local service worker. Use network-only for authentication, OneLink redirects, API calls, payments, invoices, account details, user uploads and any sensitive information. Do not implement blanket navigation caching or cross-origin caching.

## Release control
Application teams opt into updates and control activation. Do not use skipWaiting or clientsClaim automatically during sensitive workflows. Run tests before rollout.

## Registry status
Registry entries are configuration intentions, not proof of deployment or verified PWA compliance. Pilot integration requires separately inspecting each application's existing manifest and worker.
