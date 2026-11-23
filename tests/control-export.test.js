import test from "node:test";
import assert from "node:assert/strict";
import { toControlCentreFeed } from "../src/control-export.js";
test("exports only public registry fields and tri-state compliance",()=>{
 const registry={applications:[{id:"hq",name:"HQ",origin:"https://domislink.com",repository:"owner/hq",status:"pilot",secret:"never-export"}]};
 const reports=[{id:"hq",compliant:false,summary:{pass:1,fail:0,unknown:5},checks:[{id:"install",state:"unknown"}]}];
 const feed=toControlCentreFeed(registry,reports,"2026-11-23T00:00:00.000Z");
 assert.equal(feed.source,"pwa-central");
 assert.equal(feed.applications[0].pwa.checks[0].state,"unknown");
 assert.equal(JSON.stringify(feed).includes("never-export"),false);
});
test("missing evidence never becomes compliant",()=>{
 const feed=toControlCentreFeed({applications:[{id:"x",name:"X",origin:"https://x.example",repository:"o/x",status:"planned"}]},[],"now");
 assert.equal(feed.applications[0].pwa.compliant,false);
});
