const version = require('../version');

let needToMigrate = true;
try {
  const migrationVersion = require('../var/version').MIGRATION_VERSION;
  if (version.MIGRATION_VERSION === migrationVersion) {
    needToMigrate = false;
  }
} catch(e) {} // eslint-disable-line no-empty

module.exports = needToMigrate;
