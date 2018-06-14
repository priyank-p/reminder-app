const cron = require('node-cron');
const reminders = require('./models/reminders');
const pushNotifications = require('./push-notifications');

async function checkReminders() {
  const allReminders = await reminders.getReminders();
  const date = new Date();
  for (const reminder of allReminders) {
    if (!reminder.due_date) {
      return;
    }

    if (!(reminder.due_date <= date) || reminder.notified) {
      continue;
    }

    // TODO: Format the push notification more clearly
    const payload = {
      title: reminder.title,
      body: reminder.body,
      tag: `reminder-${reminder.id}`
    };

    await pushNotifications.sendPushNotification(payload);
    await reminders.updateReminder(reminder.id, { notified: true });
  }
}

// runs every 1 minute;
const tracker = cron.schedule('* * * * *', () => {
  checkReminders();
});

module.exports = tracker;
