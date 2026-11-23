import { validateManifest } from "./index.js";
export function assessPwaCompliance(app, evidence = {}) {
 const checks = [];
 const add = (id, state, detail) => checks.push({ id, state, detail });
 add("registry", app?.id && app?.origin && app?.repository ? "pass" : "fail", "Registry identity and repository");
 if (!evidence.manifest) add("manifest", "unknown", "Manifest not inspected");
 else { const errors=validateManifest(evidence.manifest); add("manifest", errors.length ? "fail" : "pass", errors.length ? errors.join("; ") : "Manifest structure valid"); }
 add("service-worker", evidence.serviceWorkerVerified === true ? "pass" : evidence.serviceWorkerVerified === false ? "fail" : "unknown", "Application-local service worker");
 add("offline-launch", evidence.offlineLaunchVerified === true ? "pass" : evidence.offlineLaunchVerified === false ? "fail" : "unknown", "Cold launch without internet");
 add("install", evidence.installVerified === true ? "pass" : evidence.installVerified === false ? "fail" : "unknown", "Installed on a real device");
 add("180-day", evidence.enduranceVerified === true ? "pass" : "unknown", "Six-month device endurance evidence");
 const summary={pass:checks.filter(c=>c.state==="pass").length,fail:checks.filter(c=>c.state==="fail").length,unknown:checks.filter(c=>c.state==="unknown").length};
 return { id:app?.id ?? "unknown", origin:app?.origin ?? null, checks, summary, compliant:summary.fail===0 && summary.unknown===0 };
}
