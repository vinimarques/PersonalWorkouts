var cacheName = 'personal-workouts';
var filesToCache = [
	'/',
	'/index.html',
	'/css/bundle.css',
	'/js/bundle.js',
	'/pages/dashboard.html',
	'/pages/home.html',
	'/pages/settings.html',
	'/img/bgr-login.png',
	'/fonts/icomoon.ttf',
	'/fonts/roboto-medium-webfont.woff2',
	'/fonts/roboto-regular-webfont.woff2'
];
self.addEventListener('install', function (e) {
	console.log('[ServiceWorker] Install');
	e.waitUntil(
		caches.open(cacheName).then(function (cache) {
			console.log('[ServiceWorker] Caching app shell');
			return cache.addAll(filesToCache);
		})
	);
});
self.addEventListener('activate', event => {
	event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request, {
			ignoreSearch: true
		}).then(response => {
			return response || fetch(event.request);
		})
	);
});
