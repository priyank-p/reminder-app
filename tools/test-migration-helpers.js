const path = require('path');
const fs = require('fs-extra');

async function resetTestDB() {
  let uplevel;
  if (env['db']) { /* global env */
    uplevel = env['db'].db;
    await uplevel.levelDB.close();
  }

  const dbPath = path.resolve(__dirname, '../var/reminder-app-test');
  await fs.remove(dbPath);

  if (uplevel) {
    uplevel.init(dbPath);
    await uplevel.waitUntilReady();
  }
}

async function run_migration(number) {
  number = number.toString();

  let migrationFunction;
  const fileName = global.migrationFiles.filter((file) => {
    return (file.startsWith(number) || file.startsWith('0' + number));
  })[0];

  const filePath = path.join(__dirname, '../app/models/migrations', fileName);
  migrationFunction = require(filePath);
  if (migrationFunction) {
    await migrationFunction();
  } else {
    throw Error('Cannot find migration file with number', number);
  }
}

async function run_migrations_upto(num) {
  const files = global.migrationFiles.filter((file) => {
    const migrationID = +file.split('-')[0];
    if (migrationID <= num) {
      return true;
    }
  });

  for (let i in files) {
    const filePath = path.join(__dirname, '../app/models/migrations', files[i]);
    const migrationFunction = require(filePath);
    await migrationFunction();
  }
}

// must be called after migrations are ran!
async function removeAllRows() {
  const { reminders } = global.env['db'];
  const allRows = await reminders.getRows();
  for (let row in allRows) {
    await reminders.deleteRow(allRows[row].id);
  }
}

module.exports = {
  resetTestDB,
  run_migration,
  run_migrations_upto,
  removeAllRows
};
