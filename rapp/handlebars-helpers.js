const fs = require('fs');
const path = require('path');

function readJSON(filePath) {
  filePath = path.resolve(__dirname, filePath);

  const contents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(contents);
}

let webpackStats = readJSON('../var/webpack-bundles.json');
let { chunks: webpackChunks } = webpackStats;
function render_bundle(bundle, attrs) {
  // we do a bit of shuffling to make sure
  // attrs is a string and only present if it was passed in
  // if not attrs were passed attr would be a object
  // sent by express-handlebars
  if (typeof attrs !== 'string') {
    attrs = '';
  }

  const chunk = webpackChunks[bundle];
  if (chunk === undefined) {
    throw new Error(`bundle, ${bundle} was not built by webpack.`);
  }

  let html = '';
  chunk.forEach(chunkFile => {
    const path = chunkFile.publicPath;
    if (path.endsWith('.js')) {
      html += `<script src="${path}" ${attrs}></script>\n`;
    } else if (path.endsWith('.css')) {
      html += `<link rel="stylesheet" href="${path}" ${attrs}>\n`;
    }
  });

  return html;
}

// updated webpack bundles is and ment to be here
// for tests
function __updateBundle(newBundle) {
  webpackStats = newBundle;
  webpackChunks = newBundle.chunks;
}

module.exports = {
  render_bundle,
  __updateBundle
};
