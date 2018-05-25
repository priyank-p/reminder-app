const { db, tableName } = require('./reminders-db');

async function initDB() {
  await db.waitUntilReady();
}

async function addReminder(fields) {
  for (let field in fields) {
    if (field === 'due_date') {
      fields[field] = new Date(field[field]);
      continue;
    }

    fields[field] = fields[field].toString();
  }

  await db.addRow(tableName, fields);
}

async function getReminders() {
  const reminders = await db.getAllRows();
  return reminders;
}

const isReady = initDB();
module.exports = {
  isReady,
  addReminder,
  getReminders
};
