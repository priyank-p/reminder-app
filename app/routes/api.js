const express = require('express');
const archives = require('../models/archives');
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
  res.json(allReminders);
});

router.delete('/reminders/delete/:id', async (req, res) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    res.status(500);
    res.send('Reminder id to delete must be passed in, and must be valid integer');
    return;
  }

  reminders.deleteReminder(id)
    .then(() => {
      res.send(`Reminder with id: ${id} was deleted!`);
    })
    .catch(() => {
      res.status(500);
      res.send(`Cannot delete reminder with id: ${id} that is not added yet!`);
    });
});

router.post('/reminders/update/:id', async (req, res) => {
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

router.get('/archives/all', async (req, res) => {
  const allArchives = await archives.getArchives();
  res.json(allArchives);
});

router.get('/archives/:id', async (req, res) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    res.status(500);
    res.send('A valid id must be passed in!');
    return;
  }

  archives.getArchiveById(id)
    .then(arhive => {
      res.json(arhive);
    })
    .catch(() => {
      res.status(500).send(`No arhives with id: ${id}.`);
    });
});

module.exports = router;
