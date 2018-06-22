const version = '{{sw-loader hash}}';

// make sure the version string is not removed by
// the minifier.
console.log(version);

self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', function (event) {
  const { body, title, tag } = event.data.json();

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      tag: tag
    })
  );
});

// we do not import the request module
// here it just better to use fetch
function deleteReminder(tag) {
  const id = parseInt(tag.replace('reminder-', ''));
  return fetch(`/api/reminders/delete/${id}`, {
    method: 'DELETE'
  });
}

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    deleteReminder(event.notification.tag)
  );
});
