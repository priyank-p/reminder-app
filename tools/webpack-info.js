const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT_DIR = path.resolve(__dirname, '../');
const cacheFile = path.join(ROOT_DIR, 'var/webpack-hash');
const bundlesFolder = path.join(ROOT_DIR, 'static/webpack-bundles');
let hash;
function needToBuild() {
  const hashFunction = crypto.createHash('md5');
  const webpackFolders = [
    'js', 'scss'
  ];

  for (let dir of webpackFolders) {
    const dirPath = path.join(ROOT_DIR, 'static', dir);
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
      const stats = fs.statSync(path.join(dirPath, file));
      hashFunction.update(stats.mtime.toString());
    });
  }

  hash = hashFunction.digest('hex');
  if (!fs.existsSync(cacheFile)) {
    fs.writeFileSync(cacheFile, hash, 'utf8');
    return true;
  }

  const currentHash = fs.readFileSync(cacheFile, 'utf8');
  if (currentHash !== hash) {
    fs.writeFileSync(cacheFile, hash, 'utf8');
    return true;
  }

  if (!fs.existsSync(bundlesFolder)) {
    return true;
  }

  return false;
}

module.exports = {
  needToPerformBuild: needToBuild(),
  hash
};
