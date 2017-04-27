self.addEventListener('install', event => {
    console.log('[ServiceWorker] Service Worker Installed Successfully.')
});

self.addEventListener('activate', event => {
    console.log('[ServiceWorker] Service Worker Activated Successfully.')
});
