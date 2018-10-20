const express = require('express');
const archives = require('../models/archives');
const reminders = require('../models/reminders');

const router = new express.Router();
router.post('/reminders/add', async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400);
    res.send('Reminder must be passed in!');
    return;
  }

  const reminder = req.body;
  if (reminder.due_date) {
    reminder.due_date = new Date(reminder.due_date);
  }

  await reminders.addReminder(reminder)
    .then(() => res.send('Reminder Added!'))
    .catch(() => {
      res.status(400).send('Incorrect reminder provided');
    });
});

router.get('/reminders/all', async (req, res) => {
  const allReminders = await reminders.getReminders();
  res.json(allReminders);
});

router.delete('/reminders/delete/:id', async (req, res) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    res.status(400);
    res.send('Reminder id to delete must be passed in, and must be valid integer');
    return;
  }

  Promise.all([archives.archive(id), reminders.deleteReminder(id)])
    .then(([archiveId]) => {
      res.send({ archiveId });
    })
    .catch(() => {
      res.status(400);
      res.send(`Cannot delete reminder with id: ${id} that is not added yet!`);
    });
});

router.post('/reminders/update/:id', async (req, res) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    res.status(400);
    res.send('Reminder id to delete must be passed in, and must be valid integer');
    return;
  }

  if (Object.keys(req.body).length === 0) {
    res.status(400);
    res.send('Reminder must be passed in!');
    return;
  }


  reminders.updateReminder(id, req.body)
    .then(() => {
      res.send(`Reminder with id: ${id} was updated!`);
    })
    .catch(() => {
      res.status(400);
      res.send(`Cannot update reminder with id: ${id}!`);
    });
});

router.get('/archives/all', async (req, res) => {
  const allArchives = await archives.getArchives();
  res.json(allArchives);
});

router.get('/archives/:id', async (req, res) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    res.status(400);
    res.send('A valid id must be passed in!');
    return;
  }

  archives.getArchiveById(id)
    .then(archive => {
      res.json(archive);
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
});

router.get('/archives/restore/:id', async (req, res) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    res.status(400).send('Id passed in must be valid!');
    return;
  }

  try {
    const archive = await archives.getArchiveById(id);

    // remove old id, and due date if its already due.
    delete archive.reminder.id;
    const { due_date } = archive.reminder;
    const today = new Date();
    if (due_date instanceof Date && due_date < today) {
      delete archive.reminder.due_date;
    }

    // set notifed field to false, so user gets
    // notification again when the notification is restored
    archive.reminder.notified = false;

    const newId = await reminders.addReminder(archive.reminder);
    await archives.deleteArchive(id);
    res.json({ newId });
  } catch(e) {
    console.error(e);
    res.status(400).send(`Cannot restore archive with id: ${id}`);
  }
});

router.delete('/archives/delete/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).send('Archive id must be valid!');
  }

  archives.deleteArchive(id)
    .then(() => { res.send('Archive deleted.'); })
    .catch(() => {
      res.status(400).send(`Cannot delete archive with id ${id}.`);
    });
});

module.exports = router;
