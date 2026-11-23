# 180-day resilience runbook

This project targets long-lived offline access; browser storage eviction, device loss, security key expiry and operating-system policies prevent a universal 180-day guarantee.

## Before disconnecting
Install the application, load all required public assets, verify the offline shell, and explicitly save approved local records. Offer a user-initiated backup. Request persistent storage from a user gesture. Show quota usage and last successful backup.

## While offline
Keep edits in IndexedDB transactions. Mark stale content clearly. Never claim a queued payment is complete. Never silently overwrite an older record with a newer server record.

## Reconnection
Verify identity, request user confirmation for queued changes, use idempotency keys and server deduplication, resolve conflicts and preserve backups until successful reconciliation.

## Validation
Automated tests must cover quota pressure, stale backups, missing shell, offline startup, storage denial, duplicate operations and conflict resolution. Browser/device tests must additionally cover restarts, long gaps, updates, browser eviction and restore.

## Ownership
PWA Central supplies shared diagnostics and policy. Every application owns its local data schema, sync endpoint, security classification and offline capability declaration.
