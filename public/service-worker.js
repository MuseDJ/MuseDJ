"use strict";

console.log('WORKER: executing.');
var version = 'v4::';
var offlineFundamentals = [
    '',
	'/',
	'manifest.json',
	'img/noimage.png',
    'css/main.css',
    'js/main.js',
	'https://code.jquery.com/jquery-2.2.0.min.js',
	'/jsmediatags/dist/jsmediatags.js',
	'/js/utils.js'
];
self.addEventListener("install", function(event) {
    console.log('WORKER: install event in progress.');
    event.waitUntil(
        caches.open(version + 'fundamentals').then(function(cache) {
            return cache.addAll(offlineFundamentals);
        }).then(function() {
            console.log('WORKER: install completed');
        })
    );
});

self.addEventListener("fetch", function(event) {
    console.log('WORKER: fetch event in progress.');
    if (event.request.method !== 'GET') {
        console.log('WORKER: fetch event ignored.\t\t', event.request.method, event.request.url);
        return;
    }

    event.respondWith(
        caches.match(event.request).then(function(cached) {
			function fetchedFromNetwork(response) {
                var cacheCopy = response.clone();
                console.log('WORKER: fetch response from network.\t', event.request.url);
                caches.open(version + 'pages').then(function add(cache) {
                    cache.put(event.request, cacheCopy);
                }).then(function() {
                    console.info('WORKER: fetch response stored in cache.\t', event.request.url);
                });
                return response;
            }
            function unableToResolve() {
				// TODO: Add better response catered to specific types
				// ex: if type is an image send a no-image which is cached
                console.log('WORKER: fetch request failed in both cache and network.');
                return new Response('<h1>Service Unavailable</h1>', {
                    status: 503,
                    statusText: 'Service Unavailable',
                    headers: new Headers({
                        'Content-Type': 'text/html'
                    })
                });
            }

            var networked = fetch(event.request).then(fetchedFromNetwork, unableToResolve).catch(unableToResolve);

            console.log('WORKER: fetch event', cached ? '(cached)' : '(network)', '\t\t', event.request.url);
            return cached || networked;
        })
    );
});

self.addEventListener("activate", function(event) {
    console.log('WORKER: activate event in progress.');
    event.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(
                keys.filter(function(key) {
                    return !key.startsWith(version);
                }).map(function(key) {
                    return caches.delete(key);
                })
            );
        }).then(function() {
            console.log('WORKER: activate completed.');
        })
    );
});
