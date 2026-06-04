const CACHE_NAME = 'devhub-v7';
const ASSETS = [
    './',
    './index.html',
    './tools.json'
];

self.addEventListener('install', e => {
    self.skipWaiting(); // Force new service worker to activate immediately
    e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', e => {
    // Delete old caches
    e.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(k => {
                if (k !== CACHE_NAME) return caches.delete(k);
            })
        )).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', e => {
    // Network first, falling back to cache
    e.respondWith(
        fetch(e.request).then(res => {
            const resClone = res.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(e.request, resClone));
            return res;
        }).catch(() => caches.match(e.request))
    );
});
