const HashManager = require('./lib/hash-manager');
const pkg = require('../package.json');

const dependencies = JSON.stringify({ ...pkg.dependencies, ...pkg.optionalDependencies });
const needToInstall = HashManager.needToUpdate('npm', { rawString: dependencies });
module.exports = {
  needToInstall,
  saveHash() {
    HashManager.save('npm');
  }
};
