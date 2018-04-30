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
const webpackProcess = spawn(webpackDevServer, ['--config', 'tools/webpack.config.js'], spawnOpts);
const expressServer = spawn('node', ['rapp', '--dev'], spawnOpts);

devProcesses.set('webpack', webpackProcess);
devProcesses.set('express-server', expressServer);

function killProcesses() {
  devProcesses.forEach((proc, name) => {
    process.kill(-proc.pid);
  });
}

process.on('SIGINT', killProcesses);
process.on('SIGTERM', killProcesses);
