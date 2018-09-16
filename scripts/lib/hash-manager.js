const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const crypto = require('crypto');

class FilesArray {
  constructor(files) {
    this.files = files;
  }
}

class HashManager {
  constructor() {
    const VAR_DIR = path.resolve(__dirname, '../../var');
    this.cacheFile = path.join(VAR_DIR, 'hashes.json');
    this.missing = !fs.existsSync(this.cacheFile);
    this.cachedHash = new Map();
    this.FilesArray = FilesArray;

    // we make sure /var directory is present
    fsExtra.ensureDirSync(VAR_DIR);
  }

  createCacheFile() {
    fs.writeFileSync(this.cacheFile, '{}');
    this.missing = false;
  }

  getCacheData() {
    if (this.missing) {
      this.createCacheFile();
      return {};
    }

    let content = fs.readFileSync(this.cacheFile, 'utf8');
    try {
      content = JSON.parse(content);
      return content;
    } catch(e) {
      this.createCacheFile();
      return {};
    }
  }

  writeCacheData(data) {
    data = { ...this.getCacheData(), ...data };
    data = JSON.stringify(data, null, 2);
    fs.writeFileSync(this.cacheFile, data, 'utf8');
  }

  getFileModificationTime(filePath) {
    const stats = fs.statSync(filePath);
    return stats.mtime.toString();
  }

  generateHash(hashable) {
    const hashFunction = crypto.createHash('md5');
    const isFilesArray = hashable instanceof FilesArray;
    if (isFilesArray) {
      hashable.files.forEach((hashableItem) => {
        hashableItem = this.getFileModificationTime(hashableItem);
        hashFunction.update(hashableItem, 'utf8');
      });
    }

    if (typeof hashable !== 'string' && !isFilesArray) {
      hashable = JSON.stringify(hashable);
    }

    if (typeof hashable === 'string') {
      hashFunction.update(hashable, 'utf8');
    }

    return hashFunction.digest('hex');
  }

  save(key) {
    const { cachedHash } = this;
    if (cachedHash.has(key)) {
      const data = {};
      data[key] = cachedHash.get(key);
      this.writeCacheData(data);
      cachedHash.delete(key);
    }
  }

  /**
    key: the name of cache key ie npm
    hashable (string, object, array, FilesArray): hashable thing.
    saveHash (default: false, boolean): save hash immediatly default false;
  **/
  needToUpdate(key, hashable, saveHash = false) {
    const data = this.getCacheData();
    const savedHash = data[key];

    let notSavedBefore = false;
    if (savedHash === undefined) {
      notSavedBefore = true;
    }

    const currentHash = this.generateHash(hashable);
    let needsToBeUpdated = false;
    if (notSavedBefore) {
      needsToBeUpdated = true;
    } else if (currentHash !== savedHash) {
      needsToBeUpdated = true;
    }

    if (needsToBeUpdated && saveHash) {
      const data = {};
      data[key] = currentHash;
      this.writeCacheData(data);
    } else if (needsToBeUpdated) {
      this.cachedHash.set(key, currentHash);
    }

    return needsToBeUpdated;
  }
}

module.exports = new HashManager();
