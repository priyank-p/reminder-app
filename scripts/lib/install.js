/**
 * Helpers for install script
*/

const path = require('path');

// common options for run calls
const opts = {
  cwd: path.resolve(__dirname, '../../'),
  silent: true
};

const ignore = {
  ...opts, stdio: 'ignore'
};

module.exports = {
  ignore, opts
};
