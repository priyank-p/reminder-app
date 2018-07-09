const express = require('express');
const reminders = require('../../models/reminders');
const archives = require('../../models/archives');

const router = express.Router();
router.post('/add', async (req, res) => {
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

router.get('/all', async (req, res) => {
  const allReminders = await reminders.getReminders();
  res.send(JSON.stringify(allReminders));
});

router.delete('/delete/:id', async (req, res) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    res.status(500);
    res.send('Reminder id to delete must be passed in, and must be valid integer');
    return;
  }

  Promise.all(archives.archive(id), reminders.deleteReminder(id))
    .then(() => {
      res.send(`Reminder with id: ${id} was deleted!`);
    })
    .catch(() => {
      res.status(500);
      res.send(`Cannot delete reminder with id: ${id} that is not added yet!`);
    });
});

router.post('/update/:id', async (req, res) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    res.status(500);
    res.send('Reminder id to delete must be passed in, and must be valid integer');
    return;
  }

  if (Object.keys(req.body).length !== 2) {
    res.status(500);
    res.send('Reminder must be passed in!');
    return;
  }

  reminders.updateReminder(id, req.body)
    .then(() => {
      res.send(`Reminder with id: ${id} was updated!`);
    })
    .catch(() => {
      res.status(500);
      res.send(`Cannot updated reminder with id: ${id}!`);
    });
});

module.exports = router;
