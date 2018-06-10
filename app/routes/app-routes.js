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

module.exports = router;
