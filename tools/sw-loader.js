const webpackInfo = require('./webpack-info');

module.exports = function swLoader(content, map, meta) {
  const callback = this.async();
  content = content.replace(/\{\{sw-loader\shash\}\}/, webpackInfo.hash);
  if (this.query.emitDevFile === true) {
    // we emit exact copy of sw file, just the version changed
    // in dev mode, it served from /webpack/sw-dev.js path
    this.emitFile('sw-dev.js', content, map);
  }

  callback(null, content, map, meta);
};
