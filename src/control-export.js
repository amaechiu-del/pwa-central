/** Public, read-only report contract for DomisLink Control Centre. */
export function toControlCentreFeed(registry, reports, generatedAt) {
 if (!Array.isArray(registry?.applications) || !Array.isArray(reports)) throw new TypeError("Registry and reports required");
 const byId = new Map(reports.map(report => [report.id, report]));
 return {
  schemaVersion: 1,
  source: "pwa-central",
  generatedAt,
  applications: registry.applications.map(app => {
   const report=byId.get(app.id);
   return {
    id:app.id,name:app.name,origin:app.origin,repository:app.repository,
    lifecycle:app.status,
    pwa:report ? { compliant:report.compliant, summary:report.summary, checks:report.checks } : {
      compliant:false,summary:{pass:0,fail:0,unknown:6},checks:[]
    }
   };
  })
 };
}
