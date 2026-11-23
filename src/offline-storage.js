const DB_VERSION = 1;
export function openOfflineDatabase(name = "domislink-offline") {
  if (typeof indexedDB === "undefined") return Promise.reject(new Error("IndexedDB unavailable"));
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(name, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("outbox")) db.createObjectStore("outbox", { keyPath: "id" });
      if (!db.objectStoreNames.contains("metadata")) db.createObjectStore("metadata", { keyPath: "key" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
export function transactionComplete(tx) {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error || new Error("Transaction aborted"));
  });
}
export async function enqueueOfflineOperation(db, operation) {
  if (!operation || typeof operation.id !== "string" || !operation.id || typeof operation.type !== "string" || !operation.type || !Number.isFinite(operation.createdAt)) throw new Error("Invalid operation");
  const tx = db.transaction("outbox", "readwrite");
  tx.objectStore("outbox").add(operation);
  await transactionComplete(tx);
  return operation.id;
}
export async function listOfflineOperations(db) {
  const tx = db.transaction("outbox", "readonly");
  const request = tx.objectStore("outbox").getAll();
  const result = new Promise((resolve, reject) => { request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error); });
  const operations = await result;
  await transactionComplete(tx);
  return operations.sort((a,b) => a.createdAt - b.createdAt);
}
export async function removeOfflineOperation(db, id) {
  const tx = db.transaction("outbox", "readwrite");
  tx.objectStore("outbox").delete(id);
  await transactionComplete(tx);
}
export async function requestPersistentStorage(navigatorObject = globalThis.navigator) {
  if (!navigatorObject?.storage?.persist) return false;
  return Boolean(await navigatorObject.storage.persist());
}
