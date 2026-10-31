var C='dayplan-v1';
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(C).then(function(c){return c.addAll(['./','./index.html']);}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==C;}).map(function(n){return caches.delete(n);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){
 if(e.request.method!=='GET'||e.request.url.indexOf(self.location.origin)!==0)return;
 e.respondWith(fetch(e.request).then(function(r){
  if(r&&r.ok){var cp=r.clone();caches.open(C).then(function(c){c.put(e.request,cp);});}
  return r;
 }).catch(function(){return caches.match(e.request).then(function(m){return m||caches.match('./index.html');});}));
});
