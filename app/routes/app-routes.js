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

module.exports = router;
