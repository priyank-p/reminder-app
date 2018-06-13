const cron = require('node-cron');
const reminders = require('./models/reminders');
const pushNotifications = require('./push-notifications');

async function checkReminders() {
  const allReminders = await reminders.getReminders();
  const date = new Date();
  for (const reminder of allReminders) {
    if (!(reminder.due_date <= date)) {
      continue;
    }

    // TODO: Format the push notification more clearly
    const payload = {
      title: reminder.title,
      body: reminder.body,
      tag: `reminder-${reminder.id}`
    };

    await pushNotifications.sendPushNotification(payload);
  }
}

// runs every 1 minute;
const tracker = cron.schedule('* * * * * *', () => {
  console.log(new Date().toTimeString());
  checkReminders();
});

module.exports = tracker;
