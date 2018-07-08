async function test_arhive_db() {
  const tableName = 'archive-reminders';
  await migrations.run_migrations_upto(3);

  const { reminders } = env['db'];
  const { levelDB } = reminders.uplevel;

  const InternalProps = await levelDB.get('__InternalProps');
  assert(InternalProps.tables[tableName] !== undefined);

  const expectedRows = [
    'ids',
    'date',
    'reminder'
  ];
  assert.deepEqual(Object.keys(InternalProps.tables[tableName]), expectedRows);
}

module.exports = test_arhive_db;
