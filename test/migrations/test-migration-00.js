async function test_db_table_created() {
  await migrations.run_migration(0);

  const { db } = env['reminder-db'];
  const levelDB = db.db;

  const InternalProps = await levelDB.get('__InternalProps');
  assert(InternalProps.tables !== undefined);
  assert(InternalProps.tables.reminders !== undefined);

  const expectedRows = [
    'ids',
    'title',
    'reminder',
    'due_date',
    'create_at'
  ];
  assert.deepEqual(Object.keys(InternalProps.tables.reminders), expectedRows);
}

module.exports = test_db_table_created;
