self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("faluche-iut-v1.20").then(function (cache) {
      return cache.addAll([
        "/assets/css/style.css", 
        "/assets/js/main.js", 
        "/js/jquery.min.js", 
        "/data/insignes.json", 
        "/data/spe.json", 
        "/index.html", 
        "/images/icon-128x128.png", 
        "/images/icon-512x512.png"
      ]);
    })
  );
});

self.addEventListener("fetch", function (e) {
  e.respondWith(
    caches.match(e.request).then(function (r) {
      return (
        r ||
        fetch(e.request).then(function (response) {
          return caches.open("faluche-iut-v1.20").then(function (cache) {
            cache.put(e.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          if ("faluche-iut-v1.20".indexOf(key) === -1) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
