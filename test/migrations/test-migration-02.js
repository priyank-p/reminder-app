async function prep_for_migration() {
  await migrations.run_migrations_upto(2);
}

async function test_migration_02() {
  const { db } = env['reminder-db'];
  const levelDB = db.db;

  const InternalProps = await levelDB.get('__InternalProps');
  const reminderTable = InternalProps.tables.reminders;
  assert.deepStrictEqual(reminderTable.due_date.required, false);
  assert.deepStrictEqual(reminderTable.due_timee, undefined);
}

async function test_field_squashing() {
  const { db } = env['reminder-db'];
  const levelDB = db.db;

  await migrations.resetTestDB();
  await migrations.run_migrations_upto(1);

  const due_date = '2018-01-01';
  const due_time = '02:20';
  await db.addRow('reminders', {
    title: 'Test Field Squashing',
    reminder: 'Test migration 02',
    due_date,
    due_time
  });

  await migrations.run_migration(2);
  const reminderRow = (await levelDB.get('reminders'))[0];
  const expectedDueDate = new Date(due_date + 'T' + due_time);
  assert.deepEqual(expectedDueDate, new Date(reminderRow.due_date));
}

module.exports = async function() {
  await prep_for_migration();
  await test_migration_02();
  await test_field_squashing();
};
