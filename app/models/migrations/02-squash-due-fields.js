/*
  Squash the due_date, and due_time filed and
  the due_date field is not required!
*/

const { db, tableName } = require('../reminders-db');

async function migration_02_squash_due_fields() {
  await db.waitUntilReady();

  const levelDB = db.db;
  const InternalProps = await levelDB.get('__InternalProps');
  delete InternalProps.tables[tableName].due_time;
  InternalProps.tables[tableName].due_date.required = false;

  const rows = db.getAllRows(tableName);
  for (const row in rows) {
    const due_time = rows[row].due_time;
    if (due_time) {
      rows[row].due_date = new Date(rows[row].due_date + 'T' + due_time);
    }
  }

  await levelDB.put('__InternalProps', InternalProps);
}

module.exports = migration_02_squash_due_fields;
