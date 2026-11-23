# Application-local integration guide

1. Audit the application's existing manifest, service worker, routing and cache strategy before changing anything.
2. Merge the service-worker template with the application's existing worker; do not blindly replace a working service worker.
3. Set ASSET_URLS to a small allowlist of public, non-sensitive, immutable shell assets. Do not precache private HTML, user-specific responses, authenticated pages or arbitrary navigation requests.
4. Host /offline.html as a static, public fallback. The template intentionally does not intercept most navigations; apps must explicitly implement safe navigation fallback if required.
5. Make an Install button visible. Use createInstallController and call prompt only on a click; show iOS Add to Home Screen instructions when the browser does not expose the prompt.
6. Use IndexedDB for explicitly approved local draft data. The backup helpers are for non-sensitive drafts only; sensitive data requires encryption, access control and key management.
7. Request persistent storage after explaining the benefit to the user. Show quota and storage status. Storage persistence is not guaranteed.
8. Test cold starts, offline reopen, upgrades, cache eviction, backup/restore and authenticated reconnection before production rollout.

The included template is a reference implementation, not production-ready for arbitrary app routing. It does not guarantee six-month offline availability or immediate browser installation.
