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

async function getArchiveById(id) {
  const allArchives = await getArchives();
  const archive = allArchives.filter(archive => archive.id === id);
  return archive[0];
}

module.exports = {
  archive,
  getArchives,
  deleteArchive,
  getArchiveById
};
