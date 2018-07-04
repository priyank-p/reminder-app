/**
  Inital migration to create the reminder database.
*/

const { db } = require('../db');

const tableName = 'reminders';
async function migrate_00_reminder_db() {
  const tableAdded = await db.hasTable(tableName);
  if (tableAdded) {
    return;
  }

  const reminders = await db.createTable(tableName);
  const { types } = db;
  await reminders.addField({ name: 'title', type: types.string, required: true });
  await reminders.addField({ name: 'reminder', type: types.string, required: true });
  await reminders.addField({ name:'due_date',  type: types.date });
  await reminders.addField({ name: 'create_at', type: types.date, default: Date.now });
}

module.exports = migrate_00_reminder_db;
