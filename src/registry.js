export function validateRegistry(registry) {
  const errors = [];
  if (registry?.schemaVersion !== 1 || !Array.isArray(registry.applications)) return ["Invalid registry schema"];
  const ids = new Set();
  const origins = new Set();
  for (const [i, app] of registry.applications.entries()) {
    const prefix = `applications[${i}]`;
    if (!/^[a-z][a-z0-9-]*$/.test(app.id ?? "")) errors.push(`${prefix}: invalid id`);
    if (ids.has(app.id)) errors.push(`${prefix}: duplicate id`);
    ids.add(app.id);
    if (typeof app.name !== "string" || !app.name.trim()) errors.push(`${prefix}: missing name`);
    try {
      const url = new URL(app.origin);
      if (url.protocol !== "https:" || url.username || url.password || url.pathname !== "/" || url.search || url.hash || url.origin !== app.origin) throw Error("invalid origin");
    } catch { errors.push(`${prefix}: origin must be an HTTPS origin`); }
    if (origins.has(app.origin)) errors.push(`${prefix}: duplicate origin`);
    origins.add(app.origin);
    if (!/^[\w.-]+\/[\w.-]+$/.test(app.repository ?? "")) errors.push(`${prefix}: invalid repository`);
    if (!["pilot", "planned", "active", "retired"].includes(app.status)) errors.push(`${prefix}: invalid status`);
    if (typeof app.manifestPath !== "string" || !/^\/(?!\/)[a-zA-Z0-9/_-]+\.webmanifest$/.test(app.manifestPath)) errors.push(`${prefix}: invalid manifest path`);
  }
  return errors;
}
