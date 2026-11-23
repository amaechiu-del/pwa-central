/** Generate an app-local offline document. Do not cache private data. */
export function offlineFallbackHtml({ name = "DomisLink Application", home = "/" } = {}) {
  const escape = value => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  if (typeof home !== "string" || !/^\/(?!\/)/.test(home)) throw new Error("home must be a local path");
  return `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Offline — ${escape(name)}</title><main><h1>You're offline</h1><p>${escape(name)} needs a connection for this page.</p><a href="${escape(home)}">Try again</a></main></html>`;
}
