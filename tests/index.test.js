import test from "node:test";
import assert from "node:assert/strict";
import { validateManifest, createInstallController } from "../src/index.js";

test("accepts a complete manifest", () => {
  assert.deepEqual(validateManifest({name:"Church",short_name:"Church",display:"standalone",start_url:"/",scope:"/",icons:[{src:"/192.png",sizes:"192x192"},{src:"/512.png",sizes:"512x512"}]}),[]);
});
test("rejects unsafe and incomplete manifests", () => {
  const errors=validateManifest({name:"X",short_name:"X",display:"standalone",start_url:"https://example.com",scope:"/",icons:[]});
  assert.ok(errors.some(e=>e.includes("start_url")));
  assert.ok(errors.some(e=>e.includes("icons")));
});
test("install prompt can be disposed", async () => {
  const listeners=new Map();
  const target={addEventListener:(n,fn)=>listeners.set(n,fn),removeEventListener:n=>listeners.delete(n)};
  const controller=createInstallController(target);
  assert.equal(controller.available,false);
  assert.deepEqual(await controller.prompt(),{outcome:"unavailable"});
  controller.dispose();
  assert.equal(listeners.size,0);
});
