// Disclaimer: this is not stable nor properly tested
// Not sure about the security implications of hijacking the fetch request either

// https://gist.github.com/pilwon/ff55634a29bb4456e0dd
const ES_MODULE_IMPORT_REGEX = /\bimport\s+(?:.+\s+from\s+)?[\'"]([^"\']+)["\']/g;

const packages = new Map().set(
  "lodash/clamp",
  "https://cdn.jsdelivr.net/npm/lodash-es@4.17.8/clamp.js"
);

self.addEventListener("fetch", event => {
  // Intercept js files
  if (event.request.url.endsWith(".js")) {
    // Hijack the fetch request
    event.respondWith(
      fetch(event.request.url)
        .then(response => response.text())
        .then(body => {
          // Replace module imports with the ones defined in the packages Map
          const mappedBody = body.replace(
            ES_MODULE_IMPORT_REGEX,
            function replacer(match, p1) {
							if (!packages.has(p1)) return match;

              return match.replace(p1, packages.get(p1));
            }
          );

          // Return the updated module
          return new Response(mappedBody, {
            headers: new Headers({
              "Content-Type": "application/javascript"
            })
          });
        })
    );
  }
});

self.addEventListener("install", event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});
