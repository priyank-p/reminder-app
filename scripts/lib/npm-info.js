const HashManager = require('./hash-manager');
const pkg = require('../../package.json');

const dependencies = { ...pkg.dependencies, ...pkg.optionalDependencies };
const needToInstall = HashManager.needToUpdate('npm', dependencies);
module.exports = {
  needToInstall,
  saveHash() {
    HashManager.save('npm');
  }
};
