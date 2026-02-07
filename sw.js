// c:\xampp\tomcat\webapps\cartographie_web_region_kaolack\sw.js
const CACHE_NAME = 'sig-kaolack-v3';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './images/icon.svg',
  
  // Feuilles de style
  './css/leaflet.css',
  './css/L.Control.Layers.Tree.css',
  './css/L.Control.Locate.min.css',
  './css/qgis2web.css',
  './css/fontawesome-all.min.css',
  './css/leaflet-search.css',
  './css/leaflet.photon.css',
  './css/leaflet-measure.css',
  './css/custom.css',
  
  // Scripts JS
  './js/qgis2web_expressions.js',
  './js/leaflet.js',
  './js/L.Control.Layers.Tree.min.js',
  './js/L.Control.Locate.min.js',
  './js/leaflet.rotatedMarker.js',
  './js/leaflet.pattern.js',
  './js/leaflet-hash.js',
  './js/Autolinker.min.js',
  './js/rbush.min.js',
  './js/labelgun.min.js',
  './js/labels.js',
  './js/leaflet.photon.js',
  './js/leaflet-measure.js',
  './js/leaflet-search.js',
  
  // Données cartographiques
  './data/Region_Kaolack_3.js',
  './data/Departement_Kaolack_4.js',
  './data/Arrondissement_Kaolack_5.js',
  './data/Route_Kaolack_6.js',
  './data/Localite_Kaolack_7.js',
  './data/School_Kaolack_8.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
