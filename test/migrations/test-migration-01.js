async function test_notified_field_added() {
  const { db, reminders } = env['reminder-db'];
  const { levelDB } = reminders.uplevel;

  await migrations.run_migrations_upto(1);
  const InternalProps = await db.getInternalProps();
  const reminderProps = InternalProps.tables['reminders'];
  assert.deepStrictEqual(reminderProps.notified, {
    type: 'boolean',
    default: false
  });

  const rows = [
    { id: 0, title: 'TestNotified', reminder: 'Migration',
      due_date: new Date(), create_at: new Date() }
  ];

  await levelDB.put('reminders', rows);
  await migrations.run_migration(1);
  assert.deepStrictEqual(await reminders.getRows(), [{
    ...rows[0],
    notified: false
  }]);

  // check adding normally does not cause
  // validation issue....
  delete rows[0].id;
  await reminders.addRow({
    ...rows[0]
  });
}

module.exports = test_notified_field_added;
