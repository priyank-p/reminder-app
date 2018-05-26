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

async function deleteReminder(id) {
  await db.deleteRow(tableName, id);
}

const isReady = initDB();
module.exports = {
  db,
  isReady,
  addReminder,
  getReminders,
  updateReminders,
  deleteReminder
};
