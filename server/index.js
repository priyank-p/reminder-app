const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const proxy = require('http-proxy-middleware');

const app = express();
app.set('views', path.join(__dirname, 'static/templates'));
app.engine('hbs', handlebars({
  extname: '.hbs',
  partialsDir: 'static/templates/partials',
  helpers: {}
}));

app.set('view engine', 'hbs');
app.get('/', function (req, res) {
    res.render('index');
});

const port = process.env.PORT || 7213;
const host = process.env.HOST || 'localhost';
app.use('/webpack', proxy({
  target: `http://${host}:${+port + 1}`,
  changeOrigin: true
}));

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
