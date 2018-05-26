/*
  This is just a sample migration which makes all the feilds required.
*/

const { db, tableName } = require('../reminders-db');

async function migrate_01_reminder_db_required_fields() {
  await db.waitUntilReady();

  const levelDB = db.db;
  const fieldsPreviouslyAdded = ['title', 'reminder', 'due_date', 'due_time'];
  const __InternalProps = await levelDB.get('__InternalProps');
  fieldsPreviouslyAdded.forEach(field => {
    const _field = __InternalProps.tables[tableName][field];
    if (_field) {
      _field.required = true;
    }
  });

  await levelDB.put('__InternalProps', __InternalProps);
}

module.exports = migrate_01_reminder_db_required_fields;
