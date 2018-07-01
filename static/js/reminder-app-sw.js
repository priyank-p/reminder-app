const version = '{{sw-loader hash}}';

// make sure the version string is not removed by
// the minifier.
console.log(version);

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
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
  }).then(() => notifyDeletedRemider(id));
}

function notifyDeletedRemider(id) {
  return clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  }).then(windows => {
    windows.forEach(page => {
      page.postMessage({
        message: 'reminder-deleted',
        id
      });
    });
  });
}

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    deleteReminder(event.notification.tag)
  );
});
