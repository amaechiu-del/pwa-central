# Ecosystem integration

Each application consumes a reviewed pinned revision of PWA Central. Its own origin hosts the manifest and service worker. SSO SDK, Pay SDK and branding assets are independently versioned.

Acceptance: manifest and icons resolve; install works on supported browsers; public shell opens offline; authentication, payment and private APIs remain network-only; update does not interrupt checkout; logout removes any user-specific local state.

Six-month offline operation is a design target for eligible public assets, not a browser storage guarantee. Test eviction, storage pressure, version changes and reconnection. Never extend authorization offline or cache private responses to satisfy the target.

No central cross-origin service worker, new paid services or automatic deployment. Report actual test results to the Services Registry; missing evidence remains unverified.
