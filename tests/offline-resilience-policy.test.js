import test from "node:test";
import assert from "node:assert/strict";
import { assessOfflineDurability, planOfflineRecovery } from "../src/offline-resilience.js";
test("warns about quota pressure and stale backup", () => {
 const result=assessOfflineDurability({cachedShell:true,persisted:false,usage:85,quota:100,lastBackupAt:0,now:180*86400000});
 assert.equal(result.sixMonthGuaranteed,false);
 assert.equal(result.warnings.length,3);
});
test("does not sync without reauthentication",()=>{
 assert.deepEqual(planOfflineRecovery({online:true,pendingOperations:2,authenticated:false}),["Reauthenticate before synchronization"]);
});
test("offline state does not suggest syncing",()=>{
 assert.ok(planOfflineRecovery({online:false,pendingOperations:2}).every(action=>!action.includes("synchronize")));
});
