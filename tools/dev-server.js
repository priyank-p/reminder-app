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
const webpackProcess = spawn(webpackDevServer, ['--config', 'tools/webpack.config.js', '--hot'], spawnOpts);

// we delay in starting the webpack server because
// we want to wait for webpack to finish writing the
// bundles json file.
setTimeout(() => {
  console.log('Staring express server...');
  const expressServer = spawn('node', ['app', '--dev'], spawnOpts);
  devProcesses.set('express-server', expressServer);
}, 2000);

devProcesses.set('webpack', webpackProcess);

function killProcesses() {
  devProcesses.forEach((proc, name) => {
    process.kill(-proc.pid);
  });
}

process.on('SIGINT', killProcesses);
process.on('SIGTERM', killProcesses);
