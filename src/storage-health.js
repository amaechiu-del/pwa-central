export async function getStorageHealth(navigatorObject = globalThis.navigator) {
  const storage = navigatorObject?.storage;
  if (!storage?.estimate) return { supported: false, persisted: false, usage: null, quota: null, usageRatio: null };
  const { usage = 0, quota = 0 } = await storage.estimate();
  const persisted = storage.persisted ? await storage.persisted() : false;
  return { supported: true, persisted: Boolean(persisted), usage, quota, usageRatio: quota > 0 ? usage / quota : null };
}
