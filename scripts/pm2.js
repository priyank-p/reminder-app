const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const run = require('../tools/run');

const ROOT_DIR = path.resolve(__dirname, '../');
const pm2File = path.join(ROOT_DIR, 'var/pm2.json');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

async function getSavedVersions() {
  if (!fs.existsSync(pm2File)) {
    return false;
  }

  const versions = await readFile(pm2File, 'utf8');
  return JSON.parse(versions);
}

async function getCurrentVersions() {
  const node = process.version;
  let pm2 = await run('npx pm2 -v', {
    cwd: ROOT_DIR,
    silent: true,
    capture: true
  });

  // pm2 -v has extra new line we need to remove
  pm2 = pm2.split('\n')[0];
  const versions = { node, pm2 };
  return versions;
}

async function saveCurrentVersions() {
  const versions = await getCurrentVersions();
  await writeFile(pm2File, JSON.stringify(versions), 'utf8');
}

/*
  Returns true if saved node and pm2 versions
  are diffrent than current version.

  If there are no saved version returns true and saves
  them

  otherwise check if both are not the same and if not
  return true and save them

  else return false
*/

async function shouldRunUpdateCmd() {
  const saved = await getSavedVersions();
  const current = await getCurrentVersions();
  if (!saved) {
    return true;
  }

  const sameNodeVersion = saved.node === current.node;
  const samePm2Version = saved.pm2 === current.pm2;
  if (!(sameNodeVersion && samePm2Version)) {
    return true;
  }

  return false;
}

async function runPm2UpdateIfNeeded() {
  const runPm2Update = await shouldRunUpdateCmd();
  if (runPm2Update) {
    await run('npx pm2 update', {
      cwd: ROOT_DIR,
      silent: true
    });

    await saveCurrentVersions();
  }
}

module.exports = {
  shouldRunUpdateCmd,
  runPm2UpdateIfNeeded,
  saveCurrentVersions
};
