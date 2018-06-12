const path = require('path');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const handlebarsHelpers = require('./handlebars-helpers');
const env = require('./env');

const ROOT_DIR = path.resolve(__dirname, '..');
const { production } = env;
module.exports = (app) => {
  if (production) {
    const compression = require('compression');
    const helmet = require('helmet');
    const minifyHTML = require('express-minify-html');

    // enable view cache to avoid sync fs calls
    app.set('view cache', true);

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

  app.use(bodyParser.json());
  app.set('view engine', 'hbs');

  // Configure headers
  // TODO: Content-Security-Headers
  app.use(function (req, res, next) {
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');

    if (!production) {
      res.setHeader('Service-Worker-Allowed', '/');
    }

    // add cache-control no-cache to html files
    const isHTMLRequest = req.path.endsWith('/') || req.path.includes('.html');
    const isSW = req.path.includes('reminder-app-sw.js');
    if (isHTMLRequest || isSW) {
      res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    }

    if (production) {
      res.setHeader('Strict-Transport-Security', 'max-age=31536000');

      // All the static files should have hashes in production
      // and we want to take full advantage -- and event when
      // we implement service-worker we still want this to here
      // for older browser complatibility.
      if (req.path.includes('/static/') && !isSW) {
        res.setHeader('Cache-Control', 'public, max-age=31536000');
      }
    }

    next();
  });
};
