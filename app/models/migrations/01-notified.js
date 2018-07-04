/*
  Adds a new field to track weather a reminder due
  was notified!
*/

const { db, reminders } = require('../db');

const tableName = 'reminders';
async function migrate_00_add_notified_field() {
  const InternalProps = await db.getInternalProps();
  const rows = await reminders.getRows();
  const { types, levelDB } = db;

  InternalProps.tables[tableName].notified = {
    type: types.boolean,
    default: false
  };

  rows.forEach((row, index) => {
    rows[index].notified = false;
  });

  await levelDB.put(db.InternalPropsKey, InternalProps);
  await levelDB.put(tableName, rows);
}

module.exports = migrate_00_add_notified_field;
