const path = require('path');
const Uplevel = require('level-uplevel');
const env = require('../env');

const { production } = env;
const DB_NAME = production ? 'reminder-app' : `reminder-app-${env.mode}`;
const DB_PATH = path.resolve(__dirname, '../../var/', DB_NAME);
const db = new Uplevel(DB_PATH);

module.exports = {
  tableName: 'reminders',
  db
};
