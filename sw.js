const V='gs-v3',ASSETS=['./','index.html','manifest.webmanifest','logo.png','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
  const same=new URL(r.url).origin===location.origin,lib=/fonts\.(googleapis|gstatic)\.com|gstatic\.com\/firebasejs|cdnjs\.cloudflare\.com/.test(r.url);
  if(!same&&!lib)return;
  e.respondWith(fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res})
    .catch(()=>caches.match(r).then(m=>m||(r.mode==='navigate'?caches.match('index.html'):undefined))))});
