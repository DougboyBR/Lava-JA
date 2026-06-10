var CACHE = 'aquajato-v4';

var arquivos = [
  './index.html',
  './manifest.json'
];

// Instala e guarda os arquivos no cache
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(arquivos);
    })
  );
});

// Serve do cache quando estiver offline
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(resposta) {
      return resposta || fetch(e.request);
    })
  );
});