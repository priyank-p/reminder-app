const express = require('express');
const reminders = require('../models/reminders');

const router = new express.Router();
router.post('/reminders/add', async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(500);
    res.send('Reminder must be passed in!');
    return;
  }

  console.log(req.body);
  res.status(200);
});

module.exports = router;
