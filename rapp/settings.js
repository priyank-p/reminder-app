const path = require('path');
const handlebars = require('express-handlebars');
const minifyHTML = require('express-minify-html');
const handlebarsHelpers = require('./handlebars-helpers')

const ROOT_DIR = path.resolve(__dirname, '..');
module.exports = (app) => {
  app.set('views', path.join(ROOT_DIR, 'static/templates'));
  app.engine('hbs',  handlebars({
    extname: '.hbs',
    partialsDir: 'static/templates/partials',
    helpers: handlebarsHelpers
  }));

  app.use(minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
      minifyJS: true
    }
  }));

  app.set('view engine', 'hbs');
};
