const fs = require('fs');
const path = require('path');
const env = require('./env');

const { development } = env;
function readJSON(filePath) {
  filePath = path.resolve(__dirname, filePath);

  let contents;
  try {
    contents = fs.readFileSync(filePath, 'utf8');
  } catch(e) {
    if (development) {
      // we watch the files for changes,
      // so its fine.
      contents = {};
    } else {
      throw e;
    }
  }

  return JSON.parse(contents);
}

const filePath = development ?
  '../var/webpack-dev-bundles.json' : '../var/webpack-bundles.json';
let webpackStats = readJSON(filePath);
let { chunks: webpackChunks } = webpackStats;

if (development && env.mode !== 'test') {
  const file = path.resolve(__dirname, filePath);
  fs.watchFile(file, () => {
    webpackChunks = readJSON(file).chunks;
    if (webpackChunks && webpackChunks.sw) {
      env['sw-path'] = webpackChunks['sw'][0];
    }
  });
}

function render_bundle(bundle, attrs) {
  // we do a bit of shuffling to make sure
  // attrs is a string and only present if it was passed in
  // if not attrs were passed attr would be a object
  // sent by express-handlebars
  if (typeof attrs !== 'string') {
    attrs = '';
  }

  if (development && webpackChunks === undefined) {
    return `
      <script>
        document.body.innerHTML = 'Looks like, webpack process is done compiling frontend assets. ';
        document.body.innerHTML += 'Please try refreshing it couple of seconds';
      </script>
    `;
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

function preserve_whitespace(html) {
  return html.replace(/\n/g, '<br>');
}

function replace_with_newlines(text) {
  return text.replace(/\n/g, '\\n');
}

function utc_date(date) {
  if (!date) {
    return;
  }

  return date.toUTCString();
}

if (webpackChunks['sw']) {
  webpackChunks['sw'].forEach(bundle => {
    // there is a .js.map file here too in production.
    if (/\.js$/.test(bundle.path)) {
      env['sw-path'] = bundle.path;
    }
  });
}

module.exports = {
  render_bundle,
  utc_date,
  preserve_whitespace,
  replace_with_newlines,
  __updateBundle
};
