/**
 * Install required npm dependencies for install script

 Install script requires ora, inquirer, and fs-extra to be installed
 we might need one or two in future so this module handles this.
*/

const path = require('path');
const { spawnSync } = require('child_process');
const depsToInstall = [
  'ora',
  'inquirer',
  'fs-extra'
];

// we pass --no-save flag so package.json in not updated; same
// goes for --no-package-lock.
const npmExe = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const cmd = `install ${depsToInstall.join(' ')} --no-save --no-package-lock`;
function needToInstall() {
  let shouldInstall = false;
  try {
    depsToInstall.forEach(dep => require(dep));
  } catch (e) {
    shouldInstall = true;
  }

  return shouldInstall;
}

function runInstall() {
  console.log('Installion few module from npm...');
  const res = spawnSync(npmExe, cmd.split(' '), {
    cwd: path.resolve(__dirname, '../../'),
    stdio: 'ignore'
  });

  if (res.status !== 0) {
    console.error('');
    console.error('npm install cmd failed!');
    console.error('This is mostly likely internet issue!');
    console.error('install command:', `${npmExe} ${cmd}`);
    process.exit(1);
  }
}

module.exports = {
  runInstall,
  needToInstall
};
