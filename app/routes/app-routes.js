const express = require('express');
const path = require('path');
const env = require('../env');
const reminders = require('../models/reminders');
const archives = require('../models/archives');
const pushNotifications = require('../push-notifications');

const { webPushData } = pushNotifications;
const router = express.Router();

router.get('/', async (req, res) => {
  res.render('index', {
    reminders: await reminders.getReminders(),
    publicKey: webPushData.publicKey,
    swPath: env.production ? '/reminder-app-sw.js' : '/webpack/sw-dev.js'
  });
});

router.get('/archives', async (req, res) => {
  res.render('archives', {
    archives: await archives.getArchives()
  });
});

router.post('/subscribe', async (req, res) => {
  const subscription = req.body;
  pushNotifications.saveSubscription(subscription)
    .then(() => res.status(201).json({}))
    .catch(() => res.status(500).send());
});

router.get('/reminder-app-sw.js', (req, res) => {
  res.type('js');
  res.sendFile(env['sw-path']);
});

router.get('/webapp-manifest.json', (req, res) => {
  res.setHeader('Content-Type', 'application/manifest+json');
  res.sendFile(path.resolve(__dirname, '../../static/webapp-manifest.json'));
});

// route to be cache by service worker
// since the "Add to Home" functionality
// does not work unless the site works offline but
// we don't internet access on localhost so we cache this
// page.
// Error:
//    Site cannot be installed: the page does not work offline
router.get('/offline', (req, res) => {
  res.type('html');
  res.send('Offline Page for SW and for Add to Home Functionality!');
});

module.exports = router;
