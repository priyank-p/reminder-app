async function test_arhive_db() {
  const tableName = 'arhive-reminders';
  await migrations.run_migrations_upto(3);

  const { reminders } = env['reminder-db'];
  const { levelDB } = reminders.uplevel;

  const InternalProps = await levelDB.get('__InternalProps');
  assert(InternalProps.tables[tableName] !== undefined);

  const expectedRows = [
    'date',
    'reminder'
  ];
  assert.deepEqual(Object.keys(InternalProps.tables.reminders), expectedRows);
}

module.exports = test_arhive_db;
