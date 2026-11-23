import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { validateRegistry } from "../src/registry.js";
import { offlineFallbackHtml } from "../src/offline.js";
test("registry validates", () => {
  const registry = JSON.parse(readFileSync(new URL("../registry/apps.json", import.meta.url), "utf8"));
  assert.deepEqual(validateRegistry(registry), []);
});
test("duplicate application is rejected", () => {
  const app = {id:"test",name:"Test",origin:"https://test.domislink.com",repository:"owner/repo",status:"pilot",manifestPath:"/manifest.webmanifest"};
  assert.ok(validateRegistry({schemaVersion:1,applications:[app,app]}).some(e=>e.includes("duplicate")));
});
test("offline document escapes input and rejects external navigation", () => {
  assert.ok(offlineFallbackHtml({name:"<script>"}).includes("&lt;script&gt;"));
  assert.throws(()=>offlineFallbackHtml({home:"//external.example"}));
});
