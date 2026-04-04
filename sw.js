const CACHE = "taniere-v1";
const BASE = "/la-taniere/";

const ASSETS = [
  BASE,
  BASE + "index.html",
  BASE + "logo.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", e => {
  if (!e.request.url.startsWith(self.location.origin)) return;

  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});