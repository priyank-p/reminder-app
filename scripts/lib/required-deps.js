/**
 * Install required npm dependencies for install script

 Install script requires ora, inquirer, and fs-extra to be installed
 we might need one or two in future so this module handles this.
*/

const path = require('path');
const fs = require('fs');
const { spawnSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '../../');
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
  const shouldInstall = depsToInstall.every(dep => {
    const modulePath = path.join(ROOT_DIR, 'node_modules', dep);
    return fs.existsSync(modulePath);
  });

  return !shouldInstall;
}

function runInstall() {
  console.log('Installing few module from npm...');
  const res = spawnSync(npmExe, cmd.split(' '), {
    cwd: ROOT_DIR,
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
