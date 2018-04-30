const fs = require('fs');
const path = require('path');

function readJSON(filePath) {
  filePath = path.resolve(__dirname, filePath);

  const contents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(contents);
}

const webpackStats = readJSON('../var/webpack-bundles.json');
const { chunks: webpackChunks } = webpackStats;
function render_bundle(bundle, attrs = '') {
  const chunk = webpackChunks[bundle];
  if (chunk === undefined) {
    throw new Error(`bundle, ${bundle} was not built by webpack.`);
  }

  let html = '';
  chunk.forEach(chunkFile => {
    const path = chunkFile.publicPath;
    if (path.endsWith('.js')) {
      html += `<script src="${path}" ${attrs}>`;
    } else if (path.endsWith('.css')) {
      html += `<link rel="stylesheet" href="${path}" ${attrs}>`;
    }
  });

  return html;
}

module.exports = {
  render_bundle
};
