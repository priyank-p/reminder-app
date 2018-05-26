const { db, tableName } = require('./reminders-db');

async function initDB() {
  await db.waitUntilReady();
}

async function addReminder(fields) {
  for (let field in fields) {
    if (field === 'due_date') {
      continue;
    }

    fields[field] = fields[field].toString();
  }

  await db.addRow(tableName, fields);
}

async function getReminders() {
  const reminders = await db.getAllRows(tableName);
  return reminders;
}

async function updateReminders(updatedReminders) {
  await db.updateTable(tableName, updatedReminders);
}

const isReady = initDB();
module.exports = {
  isReady,
  addReminder,
  getReminders,
  updateReminders,
  db
};
