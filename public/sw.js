/* Service worker Monpapierrame : l'application s'ouvre vite et reste utilisable hors connexion (pages déjà vues). */
const VERSION = "mpr-v1";
const PAGES = `${VERSION}-pages`;
const STATIQUE = `${VERSION}-static`;

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(PAGES).then((c) => c.addAll(["/", "/offline.html"])).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((noms) => Promise.all(noms.filter((n) => !n.startsWith(VERSION)).map((n) => caches.delete(n)))).then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/feed/") || url.pathname === "/sw.js") return;

  // Pages : réseau d'abord (contenu à jour), puis copie en mémoire, puis page hors ligne
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copie = res.clone();
          caches.open(PAGES).then((c) => c.put(req, copie));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match("/offline.html"))),
    );
    return;
  }

  // Images, scripts et styles : copie d'abord, mise à jour en arrière-plan
  if (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/images/") || /\.(?:png|jpg|jpeg|webp|svg|woff2?)$/.test(url.pathname)) {
    event.respondWith(
      caches.open(STATIQUE).then((cache) =>
        cache.match(req).then((cachee) => {
          const reseau = fetch(req)
            .then((res) => {
              if (res.ok) cache.put(req, res.clone());
              return res;
            })
            .catch(() => cachee);
          return cachee || reseau;
        }),
      ),
    );
  }
});
