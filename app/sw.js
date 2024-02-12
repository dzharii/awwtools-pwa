
const cacheName = 'calculator-v1';
const staticAssets = [
  './',
  'index.html',
  'windows-3.11-calculator-styles.css',
  'windows-3.11-calculator.js',
  'icons/icon-192x192.png',
  'icons/icon-512x512.png'
];

self.addEventListener('install', async event => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
});

self.addEventListener('fetch', event => {
  event.respondWith(cachedResponse(event.request));
});

async function cachedResponse(request) {
  const cache = await caches.match(request);
  return cache || fetch(request);
}

