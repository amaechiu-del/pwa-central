/** Validate an app-owned PWA manifest without modifying it. */
export function validateManifest(manifest) {
  const errors = [];
  if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) return ["Manifest must be an object"];
  if (!manifest.name || typeof manifest.name !== "string") errors.push("name is required");
  if (!manifest.short_name || typeof manifest.short_name !== "string") errors.push("short_name is required");
  if (!["standalone", "minimal-ui", "fullscreen", "browser"].includes(manifest.display)) errors.push("display is invalid");
  if (!Array.isArray(manifest.icons) || !manifest.icons.some(icon => icon?.src && /192x192/.test(icon.sizes || "")) || !manifest.icons.some(icon => icon?.src && /512x512/.test(icon.sizes || ""))) errors.push("192x192 and 512x512 icons are required");
  if (typeof manifest.start_url !== "string" || !manifest.start_url.startsWith("/")) errors.push("start_url must be a same-origin absolute path");
  if (typeof manifest.scope !== "string" || !manifest.scope.startsWith("/")) errors.push("scope must be a same-origin absolute path");
  return errors;
}

/** An opt-in, browser-only install prompt controller. */
export function createInstallController(target) {
  let deferred = null;
  const onBeforeInstall = event => { event.preventDefault(); deferred = event; };
  target.addEventListener("beforeinstallprompt", onBeforeInstall);
  return {
    get available() { return deferred !== null; },
    async prompt() {
      if (!deferred) return { outcome: "unavailable" };
      const event = deferred;
      deferred = null;
      await event.prompt();
      return event.userChoice ?? { outcome: "unknown" };
    },
    dispose() { target.removeEventListener("beforeinstallprompt", onBeforeInstall); deferred = null; }
  };
}
