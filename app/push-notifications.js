const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const webPush = require('web-push');

const writeFile = promisify(fs.writeFile);
const dataPath = path.resolve(__dirname, '../var/push-notifications.json');

let webPushData;
try {
  webPushData = require(dataPath);
} catch(e) {
  const vapidKeys = webPush.generateVAPIDKeys();
  webPushData = {
    subscriptions: [],
    ...vapidKeys
  };

  fs.writeFileSync(dataPath, JSON.stringify(webPushData, null, 2), 'utf8');
}

webPush.setVapidDetails(
  'mailto:priyankp390@gmail.com', // TODO: Figure out what can we put here?
  webPushData.publicKey,
  webPushData.privateKey
);

async function saveSubscription(pushSubscription) {
  webPushData.subscriptions.push(pushSubscription);
  await writeFile(dataPath, JSON.stringify(webPushData, null, 2), 'utf8');
}

module.exports = {
  saveSubscription
};
