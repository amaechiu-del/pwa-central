import { readFileSync } from "node:fs";
import { validateRegistry } from "../src/registry.js";
const registry = JSON.parse(readFileSync(new URL("../registry/apps.json", import.meta.url), "utf8"));
const errors = validateRegistry(registry);
if (errors.length) { console.error(errors.join("\n")); process.exitCode = 1; }
else console.log(`Registry valid: ${registry.applications.length} applications`);
