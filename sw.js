const CACHE="acc-presentaciones-v1.9.0";
const CORE=[
  "./",
  "./index.html",
  "./manifest.json",
  "./version.json",
  "./assets/logo-acc.jpg",
  "./assets/equipo-corporativo.jpeg",
  "./assets/consultoria-datos.jpg",
  "./assets/equipo-corporativo-print.jpg",
  "./assets/consultoria-datos-print.jpg",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/apple-touch-icon.png"
];

self.addEventListener("install", event=>{
  event.waitUntil(
    caches.open(CACHE)
      .then(cache=>cache.addAll(CORE))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener("activate", event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener("message", event=>{
  if(event.data && event.data.type==="SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", event=>{
  if(event.request.method!=="GET") return;

  const req = event.request;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  if(!sameOrigin) return;

  const isAppShell =
    req.mode === "navigate" ||
    url.pathname.endsWith("/index.html") ||
    url.pathname.endsWith("/version.json") ||
    url.pathname.endsWith("/manifest.json");

  if(isAppShell){
    event.respondWith(
      fetch(req, {cache:"no-store"})
        .then(resp=>{
          const copy=resp.clone();
          caches.open(CACHE).then(c=>c.put(req, copy));
          return resp;
        })
        .catch(()=>caches.match(req).then(r=>r || caches.match("./index.html")))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(cached=>{
      if(cached) return cached;
      return fetch(req).then(resp=>{
        const copy=resp.clone();
        caches.open(CACHE).then(c=>c.put(req, copy));
        return resp;
      });
    })
  );
});
