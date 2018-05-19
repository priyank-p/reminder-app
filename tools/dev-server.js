const { spawn } = require('child_process');
const path = require('path');

const devProcesses = new Map();
const spawnOpts = {
  cwd: path.resolve(__dirname, '..'),
  env: process.env,
  stdio: 'inherit',
  detached: true
};

const webpackDevServer = './node_modules/.bin/webpack-dev-server';
const webpackArgs = ['--config', 'tools/webpack.config.js', '--hot'];
const webpackProcess = spawn(webpackDevServer, webpackArgs, spawnOpts);
const expressServer = spawn('node', ['app', '--dev'], spawnOpts);

devProcesses.set('webpack', webpackProcess);
devProcesses.set('express-server', expressServer);

let alreadyKilled = false;
function killProcesses() {
  if (alreadyKilled) {
    return;
  }

  alreadyKilled = true;
  devProcesses.forEach((proc, name) => {
    process.kill(-proc.pid);
  });
}

process.on('SIGINT', killProcesses);
process.on('SIGTERM', killProcesses);
