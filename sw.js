const cacheName = "mws-restaurant-project";
const offlineUrl = "index.html";

self.addEventListener("install", event => {
  const urlsToCache = [
    offlineUrl,
	'/',
    "/restaurant.html",
    "/css/styles.css",
    "/data/restaurants.json",
    "/js/dbhelper.js",
    "/js/main.js",    
    "/js/restaurant_info.js",
	'/img/1.jpg',
	'/img/2.jpg',
	'/img/3.jpg',
	'/img/4.jpg',
	'/img/5.jpg',
	'/img/6.jpg',
	'/img/7.jpg',
	'/img/8.jpg',
	'/img/9.jpg',
	'/img/10.jpg',
	'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
	'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css'
  ];

  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    // check to see whether the request exists in the cache or not
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }
    
    // if it doesn't exist, add response into the cache
    // in the case of failed fetch, fall back to cached offline source
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest)
        .then(response => {
          if (!response || response.status !== 200) {
            return response;
          }

          const responseToCache = response.clone();

          caches.open(cacheName).then(cache => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(error => {
          if (
            event.request.method === "GET" &&
            event.request.headers.get("accept").includes("text/html")
          ) {
            return caches.match(offlineUrl);
          }
        });
    })
  );
});
/***********************************************************************************************/
/*const cacheName = "mws-restaurant-project";
const offlineUrl = "index.html";

self.addEventListener("install", event => {
  const urlsToCache = [
    offlineUrl,
	'/',
    "/restaurant.html",
    "/css/styles.css",
    "/data/restaurants.json",
    "/js/dbhelper.js",
    "/js/main.js",    
    "/js/restaurant_info.js",
    "/img/",
	'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
	'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css'
  ];

  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    // check to see whether the request exists in the cache or not
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }
    
    // if it doesn't exist, add response into the cache
    // in the case of failed fetch, fall back to cached offline source
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest)
        .then(response => {
          if (!response || response.status !== 200) {
            return response;
          }

          const responseToCache = response.clone();

          caches.open(cacheName).then(cache => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(error => {
          if (
            event.request.method === "GET" &&
            event.request.headers.get("accept").includes("text/html")
          ) {
            return caches.match(offlineUrl);
          }
        });
    })
  );
});
*/

/***********************************************************************************************/
/*const cacheName = 'cache-v1';

	const filesToCache = [
		'/',
		'/index.html',
		'/restaurant.html',
		"/data/restaurants.json",
		'/js/main.js',
		'/js/dbhelper.js',
		'/js/restaurant_info.js',		
		'/css/style.css',
		'/img/1.jpg',
		'/img/2.jpg',
		'/img/3.jpg',
		'/img/4.jpg',
		'/img/5.jpg',
		'/img/6.jpg',
		'/img/7.jpg',
		'/img/8.jpg',
		'/img/9.jpg',
		'/img/10.jpg',
		'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
		'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css'
	];

	self.addEventListener('install', event => {
	  event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            console.info('Caching of files Initiation');
            return cache.addAll(filesToCache);
        })
      );
	});

	self.addEventListener('activate', event => {
	  event.waitUntil(
		  caches.keys()
			.then(keyList => Promise.all(keyList.map(thisCacheName => {
            if (thisCacheName !== cacheName){
                console.log("Service worker removing cached files from", thisCacheName);
                return caches.delete(thisCacheName);
            }
        })))
		);
	  return self.clients.claim();
	});


	self.addEventListener('fetch', event => {
	  event.respondWith(caches.match(event.request)
		.then(response => response || fetch(event.request)
      .then(response => caches.open(cacheName)
      .then(cache => {
        cache.put(event.request, response.clone());
        return response;
      })).catch(event => {
      console.log('Service Worker error caching and fetching');
    }))
	 );
	});*/
	
