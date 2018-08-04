async function test_db_table_created() {
  await migrations.run_migration(0);

  const { reminders } = env['db'];
  const { levelDB } = reminders.uplevel;

  const InternalProps = await levelDB.get('__InternalProps');
  assert(InternalProps.tables !== undefined);
  assert(InternalProps.tables.reminders !== undefined);

  const expectedRows = [
    'ids',
    'title',
    'reminder',
    'due_date',
    'created_at'
  ];
  assert.deepEqual(Object.keys(InternalProps.tables.reminders), expectedRows);

  // test misspelled field correction
  const { uplevel } = reminders;
  await uplevel.renameField('reminders', 'created_at', 'create_at');
  await migrations.run_migration(0);
  assert.deepEqual(await uplevel.hasField('reminders', 'create_at'), false);
}

module.exports = test_db_table_created;
