const fs = require('fs');
const HashManager = require('../../../scripts/lib/hash-manager');

const FSOriginals = {
  writeFileSync: fs.writeFileSync,
  readFileSync: fs.readFileSync,
  existsSync: fs.existsSync,
  statSync: fs.statSync
};

let fileExists = false;
let cacheFile;
let fileStats = new Map();
fs.existsSync = function StubbedExistsSync() { return fileExists; };
fs.readFileSync = function StubbedReadFileSync() { return JSON.stringify(cacheFile); };
fs.writeFileSync = function StubbedWriteFileSync(path, content) { cacheFile = JSON.parse(content); };
fs.statSync = function StubbedStatsSync(file) {
  if (fileStats.has(file)) {
    return fileStats.get(file);
  }

  const stats = {};
  stats.mtime = new Date(Math.random() * (60 * 60 * 24 * 365));
  fileStats.set(file, stats);
  return stats;
};

(function test_basics() {
  HashManager.createCacheFile();
  assert.deepStrictEqual(HashManager.missing, false);
  assert.deepStrictEqual(cacheFile, {});

  HashManager.writeCacheData({ first: '1' });
  assert.deepStrictEqual(HashManager.getCacheData(), {
    first: '1'
  });

  HashManager.writeCacheData({ second: '2' });
  assert.deepStrictEqual(HashManager.getCacheData(), {
    first: '1',
    second: '2'
  });

  HashManager.writeCacheData({ first: 'first' });
  assert.deepStrictEqual(HashManager.getCacheData(), {
    first: 'first',
    second: '2'
  });

  HashManager.missing = true;
  cacheFile = '';
})();

(function test_generate_hash_function() {
  let hashable = 'some-string';
  let hash = HashManager.generateHash(hashable);
  assert.deepStrictEqual(hash, HashManager.generateHash(hashable));
  assert.notDeepStrictEqual(hash, HashManager.generateHash('a'));

  hashable = ['some-string', 'other-string'];
  hash = HashManager.generateHash(hashable);
  assert.deepStrictEqual(hash, HashManager.generateHash(hashable));
  assert.notDeepStrictEqual(hash, HashManager.generateHash(['a', 'b']));

  hashable = { a: 'some-string' };
  hash = HashManager.generateHash(hashable);
  assert.deepStrictEqual(hash, HashManager.generateHash(hashable));
  assert.notDeepStrictEqual(hash, HashManager.generateHash({ b: 'b' }));

  const { FilesArray } = HashManager;
  const files = new FilesArray(['a.js', 'b.js']);
  const filesHash = HashManager.generateHash(files);
  assert.deepStrictEqual(filesHash, HashManager.generateHash(files));
  assert.notDeepStrictEqual(filesHash, HashManager.generateHash(new FilesArray(['a.js', 'c.js'])));

  HashManager.debug = true;
  fileStats.set('a.js', { mtime: '10 January 2020' });
  assert.notDeepStrictEqual(filesHash, HashManager.generateHash(files));

  fileStats.delete('a.js');
  fileStats.delete('b.js');
  fileStats.delete('c.js');
})();

(function test_need_to_update_func() {
  let actual = HashManager.needToUpdate('__key_1', '__key_1');
  assert.deepStrictEqual(actual, true);
  assert.deepStrictEqual(HashManager.cachedHash.get('__key_1'), '5eff43306e813bf90533749c0cafe761');
  HashManager.save('__key_1');
  assert.deepStrictEqual(HashManager.cachedHash.get('__key_1'), undefined);
  assert.deepStrictEqual(HashManager.needToUpdate('__key_1', '__key_1'), false);

  actual = HashManager.needToUpdate('__key_1', '__changed_key_1', true);
  assert.deepStrictEqual(actual, true);
  assert.deepStrictEqual(cacheFile.__key_1, 'e141c5aff83dcbf542a75a84106f4834');
  assert(!HashManager.needToUpdate('__key_1', '__changed_key_1', true));
  assert.deepStrictEqual(HashManager.cachedHash.get('__key_1'), undefined);

  actual = HashManager.needToUpdate('__key_2', new HashManager.FilesArray([ 'first-file.js', 'second-file.hbs' ]), true);
  assert.deepStrictEqual(actual, true);
  assert.deepStrictEqual(HashManager.needToUpdate('__key_2', new HashManager.FilesArray([ 'first-file.js', 'second-file.hbs' ])), false);
})();

// restore fs stubs
for (let method in FSOriginals) {
  fs[method] = FSOriginals[method];
}
