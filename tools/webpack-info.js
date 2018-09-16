const fs = require('fs');
const path = require('path');
const HashManager = require('../scripts/lib/hash-manager');

const webpackFiles = [];
const ROOT_DIR = path.resolve(__dirname, '..');
const webpackFolders = [ 'static/js', 'static/scss' ];
const files = [
  'tools/webpack-entries.js', 'tools/webpack.config.js',
  'tools/webpack', 'tools/webpack-info.js'
];

webpackFolders.forEach(folder => {
  const dirPath = path.resolve(ROOT_DIR, folder);
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    webpackFiles.push(path.resolve(dirPath, file));
  });
});

files.forEach(file => {
  webpackFiles.push(path.resolve(ROOT_DIR, file));
});

webpackFiles.forEach(file => {
  const filePath = path.resolve(ROOT_DIR, file);
  webpackFiles.push(filePath);
});

const needToPerformBuild = HashManager.needToUpdate('webpack', { files: webpackFiles });
const hash = HashManager.getCacheData().webpack || HashManager.cachedHash.get('webpack');
module.exports = {
  needToPerformBuild,
  hash,
  saveHash() {
    module.exports.needToPerformBuild = false;
    HashManager.save('webpack');
  }
};
