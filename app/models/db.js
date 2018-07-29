const path = require('path');
const Uplevel = require('level-uplevel');
const env = require('../env');

const { production } = env;
let DB_NAME = production ? 'reminder-app' : 'reminder-app-development';
if (env.tests) {
  DB_NAME = `reminder-app-${env.mode}`;
}

const DB_PATH = path.resolve(__dirname, '../../var/', DB_NAME);
const db = new Uplevel(DB_PATH);

// we don't use the async method here,
// since we know the table is created in advance
const reminders = new Uplevel.UplevelTableInstance(db, 'reminders');
const archives = new Uplevel.UplevelTableInstance(db, 'archive-reminders');

module.exports = {
  reminders,
  archives,
  db
};

if (env.tests) {
  env.setEnv('db', module.exports);
}
