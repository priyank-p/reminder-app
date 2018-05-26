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

router.delete('/reminders/delete/:id', async (req, res) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    res.status(500);
    res.send('Reminder id to delete must be passed in, must be valid integer');
    return;
  }

  reminders.deleteReminder(id)
    .then(() => {
      res.send(`Reminder with id: ${id} was deleted!`);
    })
    .catch(() => {
      res.status(500);
      res.send(`Cannot delete reminder with id: ${id} that is not added!`);
    });
});

module.exports = router;
