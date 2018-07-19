const cron = require('node-cron');
const reminders = require('./models/reminders');
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

// runs every 1 minute;
const tracker = cron.schedule('* * * * *', () => {
  checkReminders();
});

module.exports = tracker;
