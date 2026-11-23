/** Offline durability diagnostics: never promise retention beyond browser guarantees. */
export function assessOfflineDurability({ cachedShell, persisted, usage, quota, lastBackupAt, now = Date.now() }) {
  const warnings = [];
  if (!cachedShell) warnings.push("Application shell has not been verified in Cache Storage");
  if (!persisted) warnings.push("Browser has not granted persistent storage");
  const ratio = Number.isFinite(usage) && Number.isFinite(quota) && quota > 0 ? usage / quota : null;
  if (ratio !== null && ratio >= 0.8) warnings.push("Storage usage is at least 80% of reported quota");
  const backupAgeDays = Number.isFinite(lastBackupAt) && lastBackupAt <= now ? (now - lastBackupAt) / 86400000 : null;
  if (backupAgeDays === null || backupAgeDays > 30) warnings.push("No recent offline data backup is recorded");
  return { offlineShellReady: Boolean(cachedShell), storagePersistent: Boolean(persisted), usageRatio: ratio, backupAgeDays, warnings, sixMonthGuaranteed: false };
}
/** Metadata-only recovery plan; no automatic deletion or destructive migrations. */
export function planOfflineRecovery({ online, pendingOperations = 0, authenticated = false, backupAvailable = false }) {
  const actions = [];
  if (!online) actions.push("Keep working on approved local drafts; defer synchronization");
  if (online && pendingOperations > 0 && !authenticated) actions.push("Reauthenticate before synchronization");
  if (online && pendingOperations > 0 && authenticated) actions.push("Request confirmation and synchronize idempotently");
  if (backupAvailable) actions.push("Offer user-controlled backup restore with conflict preview");
  return actions;
}
