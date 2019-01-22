var cacheName = 'personal-workouts-v2';
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
	console.log('[Service Worker] Install');
	e.waitUntil(
		caches.open(cacheName).then(function (cache) {
			console.log('[Service Worker] Caching all: app shell and content');
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener('fetch', function (event) {
	const request = event.request.url.replace('https://personal.v2rm.com','');

	if (filesToCache.indexOf(request) !== -1) {
		event.respondWith(
			caches.open(cacheName).then(function (cache) {
				return cache.match(event.request).then(function (response) {
					return response || fetch(event.request).then(function (response) {
						cache.put(event.request, response.clone());
						return response;
					});
				});
			})
		);
	}
});
