/**
  Inital migration to create the reminder database.
*/

const { db, tableName } = require('../reminders-db');

async function migrate_00_reminder_db() {
  await db.waitUntilReady();

  if (!db.hasTable(tableName)) {
    await db.createTable(tableName);
    await db.addField(tableName, 'title', { type: String, required: true });
    await db.addField(tableName, 'reminder', { type: String, required: true });
    await db.addField(tableName, 'due_date', { type: Date });
    await db.addField(tableName, 'create_at', { type: Date, timestamp: true });
  }
}

module.exports = migrate_00_reminder_db;
