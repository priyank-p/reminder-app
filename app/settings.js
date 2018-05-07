const path = require('path');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const handlebarsHelpers = require('./handlebars-helpers');

const ROOT_DIR = path.resolve(__dirname, '..');
const production = process.env.RAPP_PRODUCTION === 'true';
module.exports = (app) => {
  if (production) {
    const compression = require('compression');
    const helmet = require('helmet');
    const minifyHTML = require('express-minify-html');

    // enables compression in production
    app.use(compression());

    // ensures security related stuff
    app.use(helmet());

    // compress html in production
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
  }

  app.set('views', path.join(ROOT_DIR, 'static/templates'));
  app.engine('hbs',  handlebars({
    extname: '.hbs',
    partialsDir: 'static/templates/partials',
    helpers: handlebarsHelpers
  }));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.set('view engine', 'hbs');

  // Configure headers
  app.use(function (req, res, next) {
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');

    // add cache-control no-cache to html files
    const isHTMLRequest = req.path.endsWith('/') || req.path.includes('.html');
    if (isHTMLRequest) {
      res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    }

    if (production) {
      res.setHeader('Strict-Transport-Security', 'max-age=31536000');

      if (req.path.includes('/static/')) {
        res.setHeader('Cache-Control', 'public, max-age=31536000');
      }
    }

    next();
  });
};
