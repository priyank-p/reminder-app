const escapeHTML = require('escape-html');
const { reminders } = require('./db');

function validateReminder(fields) {
  const allowedFields = ['title', 'reminder', 'due_date'];
  for (let field in fields) {
    const isEmpty = field === '';
    const isNotString = typeof fields[field] !== 'string';
    if (field === 'due_date' || isEmpty || isNotString) {
      continue;
    }

    if (!allowedFields.includes(field)) {
      delete fields[field];
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
  validateReminder,
  addReminder,
  getReminders,
  updateReminder,
  deleteReminder,
  getReminderById
};
