/**
 * Helpers for install script
*/

const path = require('path');
const run = require('../../tools/run');

// common options for run calls
const opts = {
  cwd: path.resolve(__dirname, '../../'),
  silent: true
};

const ignore = {
  ...opts, stdio: 'ignore'
};

async function isPm2Installed() {
  let isInstalled = true;
  try {
    await run('pm2 --help', ignore);
  } catch(e) {
    isInstalled = false;
  }

  return isInstalled;
}

module.exports = {
  ignore, opts,
  isPm2Installed
};
