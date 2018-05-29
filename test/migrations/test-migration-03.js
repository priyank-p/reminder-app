const escapeHTML = require('escape-html');

async function prep_for_migration() {
  await migrations.run_migrations_upto(2);
}

async function test_row_are_escaped_after_migration() {
  const { db } = env['reminder-db'];

  const row = {
    title: '<h1>title</h1>',
    reminder: 'Well <script>alert("XSS");</script>',
    due_date: new Date(),
    due_time: '12:00'
  };

  await db.addRow('reminders', row);
  await migrations.run_migration(3);

  const reminderRow = (await db.getAllRows('reminders'))[0];
  assert.deepEqual(escapeHTML(row.title), reminderRow.title);
  assert.deepEqual(escapeHTML(row.reminder), reminderRow.reminder);
}

async function migration_runs_sucessfully_with_no_rows() {
  const { db } = env['reminder-db'];
  const levelDB = db.db;

  await levelDB.del('reminders');
  await migrations.run_migration(3);
}

module.exports = async function() {
  await prep_for_migration();
  await test_row_are_escaped_after_migration();
  await migration_runs_sucessfully_with_no_rows();
};
