const express = require('express');
const reminders = require('../models/reminders');
const pushNotifications = require('../push-notifications');

const { webPushData } = pushNotifications;
const router = express.Router();

router.get('/', async (req, res) => {
  res.render('index', {
    reminders: await reminders.getReminders(),
    publicKey: webPushData.publicKey
  });
});

router.post('/subscribe', async (req, res) => {
  const subscription = req.body;
  pushNotifications.saveSubscription(subscription)
    .then(() => res.status(201).json({}))
    .catch(() => res.status(500).send());
});

module.exports = router;
