import test from "node:test";
import assert from "node:assert/strict";
import { reconcileServicesRegistry } from "../src/services-registry-adapter.js";
const feed={schemaVersion:1,source:"pwa-central",applications:[{id:"headquarters",origin:"https://domislink.com",repository:"amaechiu-del/domislink.com",pwa:{compliant:false}}]};
test("matches an existing registry record without writing",()=>{
 const services=[{id:"domislink-hq",repository:"amaechiu-del/domislink.com",base_url:"https://domislink.com"}];
 assert.equal(reconcileServicesRegistry(feed,services)[0].serviceId,"domislink-hq");
});
test("unmatched apps remain unregistered",()=>{
 assert.equal(reconcileServicesRegistry(feed,[])[0].status,"unmatched");
});
test("conflicting repository and origin matches are flagged",()=>{
 const services=[{id:"one",repository:"amaechiu-del/domislink.com"},{id:"two",base_url:"https://domislink.com"}];
 assert.equal(reconcileServicesRegistry(feed,services)[0].status,"conflict");
});
