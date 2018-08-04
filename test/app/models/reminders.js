const { db } = env;

async function test_add_reminder_method() {
  const reminder = {
    title: '++++ Some Title ++++',
    reminder: '--- Some Reminder ---',
    due_date: new Date('8 March 2010')
  };
  const id = await reminders.addReminder(reminder);

  const rows = await db.reminders.getRows();
  const actual = rows.filter(row => row.id === id);
  assert.deepEqual(actual[0], {
    ...reminder,
    id
  });
}

async function test_get_reminders_method() {
  const actual = await db.reminders.getRows();
  const expected = await reminders.getReminders();
  assert.deepEqual(actual, expected);
}

async function reminder_model_tests() {
  await test_add_reminder_method();
  await test_get_reminders_method();
}

module.exports = reminder_model_tests;
