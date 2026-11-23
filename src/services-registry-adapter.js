/** Read-only reconciliation; never creates or modifies registry services. */
export function reconcileServicesRegistry(feed, services) {
 if(feed?.schemaVersion!==1 || feed.source!=="pwa-central" || !Array.isArray(feed.applications)) throw new TypeError("Invalid PWA feed");
 if(!Array.isArray(services)) throw new TypeError("Services must be an array");
 const byRepository=new Map(services.filter(s=>typeof s.repository==="string").map(s=>[s.repository.toLowerCase(),s]));
 const byOrigin=new Map(services.filter(s=>typeof s.base_url==="string").map(s=>[s.base_url.replace(/\/$/,""),s]));
 return feed.applications.map(app=>{
  const repoMatch=byRepository.get(app.repository.toLowerCase());
  const originMatch=byOrigin.get(app.origin.replace(/\/$/,""));
  const conflict=Boolean(repoMatch&&originMatch&&repoMatch.id!==originMatch.id);
  const service=conflict?null:(repoMatch||originMatch||null);
  return {appId:app.id,serviceId:service?.id??null,status:conflict?"conflict":service?"matched":"unmatched",pwa:app.pwa};
 });
}
