async function test_notified_field_added() {
  const { db, reminders } = env['db'];
  const { levelDB } = reminders.uplevel;

  await migrations.run_migrations_upto(0);
  const InternalProps = await db.getInternalProps();
  const reminderProps = InternalProps.tables['reminders'];

  const rows = [
    { id: 0, title: 'TestNotified', reminder: 'Migration',
      due_date: new Date(), created_at: new Date() }
  ];

  await levelDB.put('reminders', rows);
  await migrations.run_migration(1);
  assert.deepEqual(await reminders.getRows(), [{
    ...rows[0],
    notified: false
  }]);

  assert.deepStrictEqual(reminderProps.notified, {
    type: 'boolean',
    default: false
  });
}

module.exports = test_notified_field_added;
