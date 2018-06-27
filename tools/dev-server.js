const { spawn } = require('child_process');
const path = require('path');

const devProcesses = new Map();
const spawnOpts = {
  cwd: path.resolve(__dirname, '..'),
  env: process.env,
  stdio: 'inherit',
  detached: true,
  windowsHide: true
};

const argparser = require('../app/argparser');
const args = argparser(`
Runs the reminder-app development server.

Flags:
----------------
--webpack-output    Enables webpack output for dev-server, which is disabled by default.
`);
args.add('--webpack-output', { type: 'boolean' });
args.parse();

const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const webpackArgs = ['webpack-dev-server', '--config', 'tools/webpack.config.js', '--hot'];
if (!args['webpack-output']) {
  webpackArgs.push('--quiet');
}

const webpackProcess = spawn(npx, webpackArgs, spawnOpts);
const expressServer = spawn('node', ['app', '--dev'], spawnOpts);

devProcesses.set('webpack', webpackProcess);
devProcesses.set('express-server', expressServer);

let alreadyKilled = false;
function killProcesses() {
  if (alreadyKilled) {
    return;
  }

  alreadyKilled = true;
  devProcesses.forEach((proc) => {
    process.kill(-proc.pid);
  });
}

process.on('SIGINT', killProcesses);
process.on('SIGTERM', killProcesses);
