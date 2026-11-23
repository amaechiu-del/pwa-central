export function inspectInstallReadiness({ manifest, secureContext, serviceWorkerSupported, iconsAvailable = true }) {
  const issues = [];
  if (!secureContext) issues.push("HTTPS secure context required");
  if (!serviceWorkerSupported) issues.push("Service workers unavailable");
  if (!manifest) issues.push("Manifest missing");
  if (!iconsAvailable) issues.push("Required icons unavailable");
  return { readyForBrowserEvaluation: issues.length === 0, issues, note: "Browser decides installation availability and prompt timing" };
}
