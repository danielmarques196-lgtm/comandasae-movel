// funciona sem rede: guarda a app no telemóvel; atualiza quando houver rede
const C="fof-movel-v5.08-20261011115722"; const F=["./","index.html","manifest.webmanifest","icone-192.png","icone-512.png"];
self.addEventListener("install",e=>{ e.waitUntil(caches.open(C).then(c=>c.addAll(F))); self.skipWaiting(); });
self.addEventListener("activate",e=>{ e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x))))); self.clients.claim(); });
self.addEventListener("notificationclick",e=>{ e.notification.close(); e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(l=>{ for(const c of l){ if("focus" in c) return c.focus(); } return self.clients.openWindow("./"); })); });
self.addEventListener("push",e=>{ let d={}; try{ d=e.data?e.data.json():{}; }catch(x){ d={titulo:"ComandASAE Móvel",texto:e.data?e.data.text():""}; } e.waitUntil(self.registration.showNotification(d.titulo||"ComandASAE Móvel",{body:d.texto||"",icon:"icone-192.png"})); });
self.addEventListener("fetch",e=>{ if(e.request.method!=="GET") return; e.respondWith(fetch(e.request).then(r=>{ const c=r.clone(); caches.open(C).then(x=>x.put(e.request,c)); return r; }).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match("index.html")))); });
