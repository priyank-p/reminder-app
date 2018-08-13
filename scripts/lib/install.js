/**
 * Helpers for install script
*/

const path = require('path');
const inquirer = require('inquirer');
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

async function prompt_for_port(args) {
  if (args.port) {
    process.env.PORT = args.port;
    return;
  }

  if (args.nonInteractive) {
    return;
  }

  const prompts = [{
    type: 'input',
    name: 'port',
    message: 'Select a port for reminder-app to run on',
    default: process.env.PORT,
    validate(input) {
      const port = Number(input);
      if (isNaN(port)) {
        throw Error('Port should be a valid number!');
      }

      if (port < 0 || port > 65536) {
        throw Error('A valid port is greater than 0 and less than 65536!');
      }

      return true;
    }
  }];

  const response = await inquirer.prompt(prompts);
  process.env.PORT = response.port;
}

module.exports = {
  ignore, opts,
  isPm2Installed,
  prompt_for_port
};
