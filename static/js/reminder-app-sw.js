const version = '{{sw-loader hash}}';

// make sure the version string is not removed by
// the minifier.
console.log(version);

self.addEventListener('install', function() {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', function(event) {
  const { body, title, tag } = event.data.json();

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      tag: tag
    })
  );
});
