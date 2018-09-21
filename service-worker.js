const swl = (...args) => console.log("%c[Service Worker]", "color: green", new Date().toISOString(), ...args);
const dataCacheName = 'studiopanart-github-io__dataCache';
const cacheName = 'studiopanart-github-io__cache_v4.0';
const filesToCache = [
	'/', 
	'/index.html', 
	'/startup.js', 
	'/config.js', 
	'/components.js', 
	'/less.min.js', 
	'/mithril.js', 
	'/service-worker.js', 
	'/modules/utils.js', 
	'/modules/dom.js', 
	'/css/style.less', 
	'/ressources/icon.ico', 
	'/ressources/banner.jpg', 
	'/ressources/members/dimitra.jpg', 
	'/ressources/members/vincent.jpg', 
	'/ressources/members/paullouis.jpg', 
	'/ressources/members/philippe.jpg', 
	'https://fonts.googleapis.com/css?family=Roboto'
];

self.addEventListener('install', function(e) {
	swl("Install");

	e.waitUntil(
		caches.open(cacheName).then(function(cache) {
			swl("Caching app shell");

			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener('activate', function(e) {
	swl("Activate");

	e.waitUntil(
		caches.keys().then(function(keyList) {
			return Promise.all(keyList.map(function(key) {
				if (key !== cacheName && key !== dataCacheName) {
					swl("Removing old cache");

					return caches.delete(key);
				}
			}));
		})
	);

	return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
	swl("Fetch", e.request.url);

	e.respondWith(
		caches.match(e.request).then(function(response) {
			return response || fetch(e.request);
		})
	);
});