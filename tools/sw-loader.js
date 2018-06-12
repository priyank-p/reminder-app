const path = require('path');
const { hashElement: hashDir } = require('folder-hash');

const STATIC_DIR = path.resolve(__dirname, '../static');
const opts = {
  files: {
    include: ['*.js', '*.scss']
  },
  folders: {
    exclude: ['.*', 'templates', 'webpack-bundles']
  }
};

module.exports = function (content, map, meta) {
  const callback = this.async();
  hashDir(STATIC_DIR, opts)
    .then((hash) => {
      content = content.replace(/\{\{sw-loader\shash\}\}/, hash.hash);
      if (this.query.emitDevFile === true) {
        // we emit exact copy of sw file, just the version changed
        // in dev mode, it served from /webpack/sw-dev.js path
        this.emitFile('sw-dev.js', content, map);
      }

      callback(null, content, map, meta);
    })
    .catch(err => {
      callback(err);
    });
};
