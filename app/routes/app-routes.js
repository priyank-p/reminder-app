const express = require('express');
const env = require('../env');
const reminders = require('../models/reminders');
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

module.exports = router;
