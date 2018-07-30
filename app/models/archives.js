const reminders = require('./reminders');
const { archives } = require('./db');

async function archive(id) {
  const reminder = await reminders.getReminderById(id);
  const archiveId = await archives.addRow({
    date: new Date(),
    reminder
  });

  return archiveId;
}

async function getArchives() {
  const rows = await archives.getRows();
  return rows;
}

async function deleteArchive(id) {
  await archives.deleteRow(id);
}

async function getArchiveById(id) {
  const allArchives = await getArchives();
  const archive = allArchives.filter(archive => archive.id === id);
  if (archive[0] === undefined) {
    throw Error(`No archive with id: ${id}.`);
  }

  return archive[0];
}

// based on https://stackoverflow.com/a/6154840
async function get30DaysOldArchives() {
  const archives = await getArchives();

  const old = [];
  const today = new Date();
  archives.forEach(archive => {
    const created = new Date(archive.date);
    const diffrence = (today.getTime() - created.getTime());
    const daysOld = diffrence / (1000 * 60 * 60 * 24);
    if (daysOld > 30) {
      old.push(archive);
    }
  });

  return old;
}

module.exports = {
  archive,
  getArchives,
  deleteArchive,
  getArchiveById,
  get30DaysOldArchives
};
