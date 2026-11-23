import test from "node:test";
import assert from "node:assert/strict";
import { attachInstallButton } from "../src/install-ui.js";
test("install button has a safe fallback", async () => {
  const listeners = new Map();
  const makeTarget = () => ({addEventListener:(n,f)=>listeners.set(n,f),removeEventListener:n=>listeners.delete(n)});
  const button = makeTarget();
  const target = makeTarget();
  let fallback = 0;
  const detach = attachInstallButton({button,target,onUnavailable:()=>fallback++});
  await listeners.get("click")();
  assert.equal(fallback,1);
  detach();
  assert.equal(listeners.size,0);
});
