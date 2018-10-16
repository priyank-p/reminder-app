const mainBundle = {
  'main': [
    './static/js/index.ts',
    './static/js/app-hotkeys.ts',
    './static/js/event-listeners.ts',
    './static/js/install-app-banner.ts'
  ],
  'main-css': [
    './static/scss/reminder-app.scss',
    require.resolve('simplepicker/dist/simplepicker.css')
  ],
  'archives': './static/js/archives.ts',
  'archives-css': './static/scss/archives.scss',
  'sw': './static/js/reminder-app-sw.js'
};

const bundles = {
  ...mainBundle,
};

module.exports = bundles;
