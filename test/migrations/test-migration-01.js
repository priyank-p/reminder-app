async function prepare_for_test() {
  await migrations.run_migrations_upto(1);
}

async function test_migration_02() {
  const { db } = env['reminder-db'];
  const levelDB = db.db;

  const InternalProps = await levelDB.get('__InternalProps');
  const reminderTable = InternalProps.tables.reminders;
  for (let field in reminderTable) {
    if (field === 'ids' || field === 'create_at') {
      continue;
    }

    const fieldInfo = reminderTable[field];
    assert(fieldInfo.required);
  }
}

module.exports = async function() {
  await prepare_for_test();
  await test_migration_02();
};
