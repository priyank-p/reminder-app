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

    if (typeof fields[field] !== 'string') {
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
  const id = await reminders.addRow(fields);
  return id;
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

async function getReminderById(id) {
  const reminders = await getReminders();
  const reminder = reminders.filter(reminder => reminder.id === id);
  return reminder[0];
}

module.exports = {
  addReminder,
  getReminders,
  updateReminder,
  deleteReminder,
  getReminderById
};
