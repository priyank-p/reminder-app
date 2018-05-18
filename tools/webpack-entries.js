const mainBundle = {
  'main': './static/js/index.js',
  'main-css': './static/scss/reminder-app.scss'
};

const vendorBundle = {
  'vendor': './node_modules/font-awesome/css/font-awesome.css'
};

const bundles = {
  ...mainBundle,
  ...vendorBundle
};

module.exports = bundles;
