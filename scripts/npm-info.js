const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const packageJSON = require('../package.json');

const cacheFile = path.resolve(__dirname, '../var/cache-hashes');
let caches;
if (!fs.existsSync(cacheFile)) {
  // we make sure /var directory is avalible
  const pathInfo = path.parse(cacheFile);
  fsExtra.emptyDirSync(pathInfo.dir);

  caches = {};
  fs.writeFileSync(cacheFile, '{}', 'utf8');
} else {
  caches = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
}

const hashFunction = crypto.createHash('md5');
hashFunction.update(JSON.stringify(packageJSON.dependencies));

const hash = hashFunction.digest('hex');
let needToInstall = false;

if (!caches.npm || caches.npm !== hash) {
  needToInstall = true;
  caches.npm = hash;
  fs.writeFileSync(cacheFile, JSON.stringify(caches), 'utf8');
}

module.exports = {
  needToInstall
};
