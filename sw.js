var CACHE = 'aquajato-v2';

var arquivos = [
  './',
  './index.html',
  './manifest.json',
  './icone-192.png',
  './icone-512.png'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(arquivos);
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k) {
        return k.indexOf('aquajato-') === 0 && k !== CACHE;
      }).map(function(k) {
        return caches.delete(k);
      }));
    }).then(function() {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(function(resposta) {
      return resposta || fetch(e.request).then(function(resp) {
        return resp;
      }).catch(function() {
        if (e.request.mode === 'navigate') return caches.match('./index.html');
      });
    })
  );
});
