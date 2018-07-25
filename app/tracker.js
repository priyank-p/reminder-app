const cron = require('node-cron');
const reminders = require('./models/reminders');
const archives = require('./models/archives');
const pushNotifications = require('./push-notifications');

async function checkReminders() {
  const allReminders = await reminders.getReminders();
  const date = new Date();
  for (const reminder of allReminders) {
    if (!reminder.due_date) {
      continue;
    }

    if (!(reminder.due_date <= date) || reminder.notified) {
      continue;
    }

    const { title, id } = reminder;
    const payload = {
      title: `Due: ${title}`,
      body: `Hi! Just to remind you have following reminder due:\n${reminder.reminder}`,
      tag: `reminder-${id}`
    };

    await pushNotifications.sendPushNotification(payload);
    await reminders.updateReminder(id, { notified: true });
  }
}

async function checkArchives() {
  const old = await archives.get30DaysOldArchives();
  const deletePromiseChain = [];
  old.forEach(archive => {
    deletePromiseChain.push(archives.deleteArchive(archive.id));
  });

  await Promise.all(deletePromiseChain);
}

// runs every 1 minute;
cron.schedule('* * * * *', () => {
  // delete reminder if they are due
  checkReminders();
});

// run everday at 12AM
cron.schedule('0 12 * * *', () => {
  // delete archives that are 30 days or old
  checkArchives();
});

// since the cron job for archives is 1 day
// it might not run all the times in dev mode
// so we trigger it once at startup.
checkArchives();
