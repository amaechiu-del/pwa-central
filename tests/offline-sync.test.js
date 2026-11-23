import test from "node:test";
import assert from "node:assert/strict";
import { flushOfflineQueue } from "../src/offline-sync.js";
import { inspectInstallReadiness } from "../src/install-readiness.js";
test("offline mode never sends", async () => {
  const result = await flushOfflineQueue({online:false,list:()=>{throw Error("called")},remove:()=>{},send:()=>{}});
  assert.equal(result.sent,0);
});
test("only explicitly allowed operations are synchronized", async () => {
  const operations=[{id:"a",type:"draft"},{id:"b",type:"payment"}];
  const removed=[];
  const result=await flushOfflineQueue({list:async()=>operations,remove:async id=>removed.push(id),send:async()=>true,allowedTypes:["draft"]});
  assert.deepEqual(removed,["a"]);
  assert.equal(result.reason,"type-not-allowed");
});
test("failed sends preserve operations", async () => {
  const removed=[];
  const result=await flushOfflineQueue({list:async()=>[{id:"a",type:"draft"}],remove:async id=>removed.push(id),send:async()=>{throw Error("network")},allowedTypes:["draft"]});
  assert.equal(result.reason,"send-failed");
  assert.deepEqual(removed,[]);
});
test("install readiness is not an installation guarantee",()=>{
  assert.equal(inspectInstallReadiness({manifest:{},secureContext:true,serviceWorkerSupported:true}).readyForBrowserEvaluation,true);
});
