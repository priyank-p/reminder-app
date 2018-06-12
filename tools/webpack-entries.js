const mainBundle = {
  'main': [
    './static/js/index.js',
    './static/js/app-hotkeys.js',
    './static/js/event-listeners.js'
  ],
  'main-css': './static/scss/reminder-app.scss',
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
