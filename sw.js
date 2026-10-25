const CACHE_NAME = 'esdhubem-ebooks-v11';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './o-que-e-mapa-mental.html',
  './manifest.json',
  './assets/css/style.css',
  './assets/js/page-flip.browser.js',
  './assets/js/app.js',
  './assets/icons/pwa-192x192.png',
  './assets/icons/pwa-512x512.png',
  './assets/icons/apple-touch-icon.png',
  './assets/images/logo-cursos.png',
  './assets/images/logo_esdhubem.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(err => console.log('Cache addAll non-critical error:', err));
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Network-First with Cache Fallback:
// Ensures users always see the latest version when online,
// while providing seamless offline reading support when disconnected.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          if (event.request.mode === 'navigate') {
            return caches.match('./o-que-e-mapa-mental.html');
          }
          return null;
        });
      })
  );
});
