const express = require('express');
const reminders = require('../models/reminders');

const router = new express.Router();
router.post('/reminders/add', async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(500);
    res.send('Reminder must be passed in!');
    return;
  }

  const reminder = req.body;
  if (reminder.due_date) {
    reminder.due_date = new Date(reminder.due_date);
  }
  
  await reminders.addReminder(reminder);
  res.send('Reminder Added!');
});

router.get('/reminders/all', async (req, res) => {
  const allReminders = await reminders.getReminders();
  res.send(JSON.stringify(allReminders));
});

module.exports = router;
