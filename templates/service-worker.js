/* Copy into the application's own origin. Configure ASSET_URLS and VERSION before release. */
const VERSION = "v1";
const CACHE = "domislink-public-assets-" + VERSION;
const ASSET_URLS = ["/", "/offline.html"];
const PRIVATE_PREFIXES = ["/api/", "/auth/", "/login", "/logout", "/checkout", "/payment", "/account", "/onelink"];
self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(ASSET_URLS);
    // Do not force skipWaiting; the application controls activation.
  })());
});
self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith("domislink-public-assets-") && key !== CACHE).map(key => caches.delete(key)));
  })());
});
self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET" || request.mode === "navigate" && new URL(request.url).pathname !== "/") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || PRIVATE_PREFIXES.some(prefix => url.pathname === prefix || url.pathname.startsWith(prefix))) return;
  if (!ASSET_URLS.includes(url.pathname)) return;
  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    return fetch(request);
  })());
});
