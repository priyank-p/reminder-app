const reminders = require('./reminders');
const { arhives } = require('./db');

async function archive(id) {
  const reminder = await reminders.getReminderById(id);
  await arhives.addRow({
    date: new Date(),
    reminder
  });
}

async function getArchives() {
  const rows = await arhives.getRows();
  return rows;
}

async function deleteArchive(id) {
  await arhives.deleteRow(id);
}

module.exports = {
  archive,
  getArchives,
  deleteArchive
};
