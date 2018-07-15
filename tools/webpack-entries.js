const mainBundle = {
  'main': [
    './static/js/index.ts',
    './static/js/app-hotkeys.ts',
    './static/js/event-listeners.ts'
  ],
  'main-css': './static/scss/reminder-app.scss',
  'archives-css': './static/scss/archives.scss',
  'sw': './static/js/reminder-app-sw.js'
};

const FontAwesomeBasePath = './node_modules/@fortawesome/fontawesome-free-webfonts/css/';
const vendorBundle = {
  'vendor': [
    FontAwesomeBasePath + 'fontawesome.css',
    FontAwesomeBasePath + 'fa-solid.css'
  ]
};

const bundles = {
  ...mainBundle,
  ...vendorBundle
};

module.exports = bundles;
