async function test_add_reminder_route() {
  const url = '/api/reminders/add';
  const reminder = {
    title: 'Test Reminder',
    reminder: 'Test Reminder Body',
    due_date: new Date('January 12 2018')
  };

  await request.post(url, { body: reminder });
  const allReminders = await reminders.getReminders();
  const addedReminder = allReminders[allReminders.length - 1];
  assert.deepStrictEqual(addedReminder.title, reminder.title);
  assert.deepStrictEqual(addedReminder.reminder, reminder.reminder);
  assert.deepStrictEqual(addedReminder.due_date, reminder.due_date);

  await assertPromiseThrows(async () => {
    await request.post(url, { body: {} });
  }, /^Error: Reminder must be passed in!$/);

  await assertPromiseThrows(async () => {
    await request.post(url, {
      body: { invalidRequest: true }
    });
  }, /^Error: Incorrect reminder provided$/);
}

async function api_tests() {
  await test_add_reminder_route();
}

module.exports = api_tests;
