const escapeHTML = require('escape-html');
const { reminders } = require('./db');

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
  await reminders.addRow(fields);
}

async function getReminders() {
  const rows = await reminders.getRows();
  return rows;
}

async function updateReminder(id, updatedReminder) {
  await reminders.updateRow(id, updatedReminder);
}

async function deleteReminder(id) {
  await reminders.deleteRow(id);
}

module.exports = {
  addReminder,
  getReminders,
  updateReminder,
  deleteReminder
};
