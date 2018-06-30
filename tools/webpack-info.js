const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT_DIR = path.resolve(__dirname, '../');
const cacheFile = path.join(ROOT_DIR, 'var/cache-hashes');
const bundlesFolder = path.join(ROOT_DIR, 'static/webpack-bundles');

let hash;
let currentHash;
let caches;
if (fs.existsSync(cacheFile)) {
  caches = JSON.parse(fs.readFileSync(cacheFile));
  currentHash = caches.hash;
} else {
  caches = {};
  fs.writeFileSync(cacheFile, '{}', 'utf8');
}

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
  caches.hash = hash;
  if (!currentHash) {
    fs.writeFileSync(cacheFile, JSON.stringify(caches), 'utf8');
    return true;
  }

  if (currentHash !== hash) {
    fs.writeFileSync(cacheFile, JSON.stringify(caches), 'utf8');
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
