const CACHE="acc-presentaciones-v1.8.0";
const FILES=["./","./index.html","./manifest.json",
"./assets/logo-acc.jpg","./assets/equipo-corporativo.jpeg","./assets/consultoria-datos.jpg",
"./assets/icon-192.png","./assets/icon-512.png","./assets/apple-touch-icon.png","./assets/consultoria-datos-print.jpg","./assets/equipo-corporativo-print.jpg"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{const copy=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return resp}).catch(()=>caches.match("./index.html"))))});
