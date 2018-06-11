self.addEventListener('install', function() {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', function(event) {
  console.log(event);
  const { body, title, tag } = event.json();

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      tag: tag
    })
  );
});
