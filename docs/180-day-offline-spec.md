# 180-day offline-first target

## Scope
Target uninterrupted access to previously downloaded, non-sensitive application resources for 180 days. This is a design target, not a browser storage guarantee. Test on actual target devices and browsers. Server-only features, external APIs, login renewal, remote data and payment confirmation remain online-only.

## Installation
Provide manifest, 192px and 512px icons, HTTPS, and application-local service worker. Install affordance should be visible immediately; call browser prompt only after a user gesture and when beforeinstallprompt is available. On iOS provide platform-specific Add to Home Screen guidance.

## Persistence
Use IndexedDB for structured records and an application-local cache for versioned static resources. Request navigator.storage.persist() after a clear user action; detect quota and eviction. Keep an export and restore facility for user-owned offline records. Avoid promising permanent storage.

## Offline queue
Only explicitly approved low-risk operation types may enter the outbox. Use unique idempotency keys, transactional writes, retry with exponential backoff and server-side deduplication. Never queue payments, identity changes or privileged operations without a separate security review. Sync only after authentication is revalidated and the user has authorized the operation. Resolve conflicts without silently overwriting server data.

## Security
Encrypt sensitive offline records using a carefully reviewed key lifecycle. Never persist raw tokens or credentials in caches. Log out should clear sensitive local records. Encryption does not eliminate risk on compromised devices.

## Six-month acceptance testing
Preload required public resources; disconnect; verify cold launch and navigation; create and reopen drafts; simulate device restart and low storage; test stale data warnings, clock changes, conflict resolution, reconnection, and server idempotency. Simulate 180-day elapsed time in automated tests and conduct real-device soak tests where feasible. Do not mark 180-day compliance verified without evidence.
