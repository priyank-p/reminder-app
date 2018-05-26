const express = require('express');
const reminders = require('../models/reminders');

const router = express.Router();
router.get('/', async (req, res) => {
  res.render('index', {
    reminders: await reminders.getReminders()
  });
});

module.exports = router;
