import test from "node:test";
import assert from "node:assert/strict";
import { assessPwaCompliance } from "../src/compliance.js";
const app={id:"hq",origin:"https://domislink.com",repository:"owner/repo"};
test("missing evidence is unknown, not a pass",()=>{
 const report=assessPwaCompliance(app);
 assert.equal(report.compliant,false);
 assert.ok(report.summary.unknown>=4);
});
test("manifest validation failures are reported",()=>{
 const report=assessPwaCompliance(app,{manifest:{name:"HQ"}});
 assert.equal(report.checks.find(c=>c.id==="manifest").state,"fail");
});
test("device evidence does not imply 180-day endurance",()=>{
 const report=assessPwaCompliance(app,{installVerified:true,offlineLaunchVerified:true});
 assert.equal(report.checks.find(c=>c.id==="180-day").state,"unknown");
});
