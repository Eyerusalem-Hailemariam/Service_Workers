const cacheName = 'v2';

const cacheAssets = [
    'index.html',
    'about.html',
    'css/style.css',
    'js/main.js'
];

// Cache all the assets
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                console.log('service worker: caching files');
                return cache.addAll(cacheAssets);
            })
    );
});


//call Install Event
self.addEventListener('install', (e) => {
    console.log('service worker: installed');

})

self.addEventListener('activate', (e) => {
    console.log('service worker: activated');

    //remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('service worker: clearing old cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (e) => {
    console.log('service worker: fetching');
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});