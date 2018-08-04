/**
  Inital migration to create the reminder database.
*/

const { db } = require('../db');
const tableName = 'reminders';

async function rename_mistyped_field() {
  const hasIncorrectField = await db.hasField(tableName, 'create_at');
  if (!hasIncorrectField) {
    return;
  }

  await db.renameField(tableName, 'create_at', 'created_at');
}

async function migrate_00_reminder_db() {
  const tableAdded = await db.hasTable(tableName);
  if (tableAdded) {
    await rename_mistyped_field();
    return;
  }

  const reminders = await db.createTable(tableName);
  const { types } = db;
  await reminders.addField({ name: 'title', type: types.string, required: true });
  await reminders.addField({ name: 'reminder', type: types.string, required: true });
  await reminders.addField({ name:'due_date', type: types.date });
  await reminders.addField({ name: 'created_at', type: types.date });
}

module.exports = migrate_00_reminder_db;
