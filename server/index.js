const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const proxy = require('http-proxy-middleware');
const minifyHTML = require('express-minify-html');
const views = require('./views');

const ROOT_DIR = path.resolve(__dirname, '..');
process.chdir(ROOT_DIR);

const app = express();
app.set('views', path.join(ROOT_DIR, 'static/templates'));
app.engine('hbs', handlebars({
  extname: '.hbs',
  partialsDir: 'static/templates/partials',
  helpers: {}
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

views(app);

const port = process.env.PORT || 7213;
const host = process.env.HOST || 'localhost';
app.use('/webpack', proxy({
  target: `http://${host}:${+port + 1}`,
  changeOrigin: true
}));

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
