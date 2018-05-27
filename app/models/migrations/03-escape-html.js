/**
  Escape all the added values in db.
*/

const { db, tableName } = require('../reminders-db');
const escapeHTML = require('escape-html');

async function migration_03_escape_html() {
  const levelDB = db.db;
  await db.waitUntilReady();

  try {
    const reminderTable = await levelDB.get(tableName);
    reminderTable.forEach(table => {
      table.title = escapeHTML(table.title);
      table.reminder = escapeHTML(table.reminder);
    });
    await levelDB.put(tableName, reminderTable);
  } catch (e) {
    return;
  }
}

module.exports = migration_03_escape_html;
