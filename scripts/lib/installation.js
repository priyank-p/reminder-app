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

function printError(err, spinner) {
  spinner.fail('Oh no! Installation failed, see the traceback below for more info.');
  console.error('You can open issue at the github repo for support.');
  console.error('');
  console.error(err);
}

async function init_startup() {
  console.log();
  try {
    await run('node scripts/init-startup', opts);
  } catch(e) {
    console.error('Setting up startup failed!');
  }
}

async function prompt_init_startup(args) {
  if (args.startup) {
    await init_startup();
    return;
  }

  if (args.nonInteractive) {
    return;
  }

  const prompt = [{
    type: 'confirm',
    name: 'startup',
    message: 'Start reminder-app on machine startup (can later be setup using scripts/init-setup)',
    default: false
  }];

  const response = await inquirer.prompt(prompt);
  if (response.startup) {
    await init_startup();
  }
}

// running this install script twice and when
// a production server is using leveldb will cause error
// when running migrations so if the app is running we pre-quit.
async function ensure_not_installed(spinner) {
  let isAppRunning = true;
  try {
    await run('npx pm2 describe reminder-app', ignore);
  } catch (e) {
    isAppRunning = false;
  }

  if (isAppRunning) {
    spinner.fail('reminder-app is already installed and running.');
    console.error();
    console.error('reminder-app is already installed re-running this script');
    console.error('will just cause error when running migrations on database; since the database');
    console.error('will already be in use by the app running.');
    process.exit(1);
  }
}

module.exports = {
  ignore, opts,
  isPm2Installed,
  printError,
  init_startup,
  prompt_for_port,
  prompt_init_startup,
  ensure_not_installed
};
