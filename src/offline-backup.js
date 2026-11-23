const BACKUP_VERSION = 1;
export function exportOfflineDrafts(drafts) {
  if (!Array.isArray(drafts)) throw new Error("Drafts must be an array");
  const safe = drafts.map(d => {
    if (!d || typeof d.id !== "string" || typeof d.content !== "string") throw new Error("Invalid draft");
    return { id: d.id, content: d.content, updatedAt: Number.isFinite(d.updatedAt) ? d.updatedAt : 0 };
  });
  return JSON.stringify({ version: BACKUP_VERSION, exportedAt: new Date().toISOString(), drafts: safe });
}
export function importOfflineDrafts(serialized, { maxBytes = 5_000_000 } = {}) {
  if (typeof serialized !== "string" || new TextEncoder().encode(serialized).length > maxBytes) throw new Error("Invalid backup size");
  const data = JSON.parse(serialized);
  if (data?.version !== BACKUP_VERSION || !Array.isArray(data.drafts)) throw new Error("Unsupported backup");
  const ids = new Set();
  return data.drafts.map(d => {
    if (!d || typeof d.id !== "string" || !d.id || typeof d.content !== "string" || !Number.isFinite(d.updatedAt) || ids.has(d.id)) throw new Error("Invalid or duplicate draft");
    ids.add(d.id);
    return { id: d.id, content: d.content, updatedAt: d.updatedAt };
  });
}
