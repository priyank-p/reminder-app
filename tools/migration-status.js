const fs = require('fs');
const path = require('path');
const env = require('../app/env');
const version = require('../version');

let needToMigrate = true;
try {
  const migrationVersion = require('../var/version').MIGRATION_VERSION;
  if (version.MIGRATION_VERSION === migrationVersion) {
    needToMigrate = false;
  }
} catch(e) {} // eslint-disable-line no-empty

const DB_PATH = path.resolve(__dirname, '../var/', 'reminder-app-development');
if (env.mode === 'development' && !fs.existsSync(DB_PATH)) {
  needToMigrate = true;
}

module.exports = needToMigrate;
