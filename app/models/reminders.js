const escapeHTML = require('escape-html');
const { db, tableName } = require('./reminders-db');

function validateReminder(fields) {
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

  return fields;
}

async function addReminder(fields) {
  fields = validateReminder(fields);
  await db.addRow(tableName, fields);
}

async function getReminders() {
  const reminders = await db.getRows(tableName);
  return reminders;
}

async function updateReminder(id, updatedReminder) {
  const reminders = await db.getTableInstance(tableName);
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
