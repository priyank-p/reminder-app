/*
  Adds a new field to track weather a reminder due
  was notified!
*/

const { db, reminders } = require('../db');

async function migrate_00_add_notified_field() {
  const { types } = db;
  const field = {
    name: 'notified',
    type: types.boolean,
    default: false
  };

  await reminders.migrations.addField(field, (row) => {
    row.notified = false;
    return row;
  });
}

module.exports = migrate_00_add_notified_field;
