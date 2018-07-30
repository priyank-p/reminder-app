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

async function test_reminders_all_route() {
  const url = '/api/reminders/all';
  await reminders.addReminder({
    title: 'Just Another Reminder For Test',
    reminder: 'Test Reminder for testing /reminders/all',
    due_date: new Date('January 12 1999')
  });

  // we test the json here, since parsed json object seems to have
  // date not tranformed in actual one
  const actual = await request.get(url).then(r => r.text());
  const expected = JSON.stringify(await reminders.getReminders());
  assert.deepEqual(actual, expected);
}

async function api_tests() {
  const tests = [
    test_add_reminder_route(),
    test_reminders_all_route()
  ];

  await Promise.all(tests);
}

module.exports = api_tests;
