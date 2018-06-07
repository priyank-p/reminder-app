const escapeHTML = require('escape-html');
const { db, tableName } = require('./reminders-db');

async function addReminder(fields) {
  for (let field in fields) {
    if (field === 'due_date') {
      continue;
    }

    // Figure out why browser sends an empty
    // key/value is this a bug on our side?
    if (field === '') {
      delete fields[field];
      continue;
    }

    // escape html early on, before adding it to db.
    let sanatized = fields[field].toString().trim();
    sanatized = escapeHTML(sanatized);
    fields[field] = sanatized;
  }

  await db.addRow(tableName, fields);
}

async function getReminders() {
  const reminders = await db.getRows(tableName);
  return reminders;
}

async function updateReminder(updatedReminder) {
  const reminders = await db.getTableInstance(tableName);
  const id = updatedReminder.id;
  delete updatedReminder[id];

  await reminders.updateRow(id, updatedReminder);
}

async function deleteReminder(id) {
  await db.deleteRow(tableName, id);
}

module.exports = {
  db,
  addReminder,
  getReminders,
  updateReminder,
  deleteReminder
};
