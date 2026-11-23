import test from "node:test";
import assert from "node:assert/strict";
import { getStorageHealth } from "../src/storage-health.js";
import { exportOfflineDrafts, importOfflineDrafts } from "../src/offline-backup.js";
test("storage estimate exposes quota ratio", async () => {
  const result = await getStorageHealth({ storage: { estimate: async () => ({usage:50,quota:100}), persisted: async () => true } });
  assert.equal(result.usageRatio,0.5);
  assert.equal(result.persisted,true);
});
test("draft export and restore round-trip", () => {
  const drafts=[{id:"a",content:"offline draft",updatedAt:42}];
  assert.deepEqual(importOfflineDrafts(exportOfflineDrafts(drafts)),drafts);
});
test("rejects malformed or duplicate drafts", () => {
  assert.throws(()=>importOfflineDrafts(JSON.stringify({version:1,drafts:[{id:"a",content:"x",updatedAt:1},{id:"a",content:"y",updatedAt:2}]})));
});
