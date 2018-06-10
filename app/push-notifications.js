const fs = require('fs');
const path = require('path');
const webPush = require('web-push');

let webPushData;
try {
  webPushData = require('../var/push-notifications');
} catch(e) {
  const keysPath = path.resolve(__dirname, '../var/push-notifications.json');
  const vapidKeys = webPush.generateVAPIDKeys();
  fs.writeFileSync(keysPath, JSON.stringify(vapidKeys, null, 2), 'utf8');
}

webPush.setVapidDetails(
  'mailto:priyankp390@gmail.com', // TODO: Figure out what can we put here?
  webPushData.publicKey,
  webPushData.privateKey
);
