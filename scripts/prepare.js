const path = require('path');
const pm2 = require('./pm2');
const npmInfo = require('./npm-info');
const run = require('../tools/run');

const opts = {
  cwd: path.resolve(__dirname, '../'),
  silent: true
};

const ignore = {
  ...opts, stdio: 'ignore'
};

/**
 * Installs npm dependencies,
 * Builds frontend files using webpack, and
 * Runs migrations on the reminder-app database
 *
 * This function takes spinner, and opts
 * opts.runPm2Save = Runs `pm2 save` command
*/

async function prepare(spinner, options = {}) {
  if (npmInfo.needToInstall) {
    spinner.text = 'Installing npm dependencies';
    spinner.color = 'blue';
    await run('npm install --production --no-package-lock', ignore);
    if (options.runPm2Save) {
      await run('npx pm2 update', ignore);
    }

    npmInfo.saveHash();
    spinner.succeed();
  }

  spinner.text = 'Building frontend files and running migrations on database';
  spinner.color = 'green';
  await Promise.all([
    run('node tools/webpack', opts),
    run('node tools/run-migrations', opts)
  ]);

  await pm2.saveCurrentVersions();
  spinner.succeed();
}

module.exports = prepare;
