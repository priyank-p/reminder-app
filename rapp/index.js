const path = require('path');
const express = require('express');
const settings = require('./settings');
const views = require('./views');

const devlopment = process.argv[2] == '--dev';
const app = express();
const STATIC_DIR = path.resolve(__dirname, '../static');
app.use('/static', express.static(STATIC_DIR));

settings(app);
views(app);

const port = process.env.PORT || 7213;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

// if devlopment respond to /webpack from webpack-dev-server
if (devlopment) {
  const proxy = require('http-proxy-middleware');
  const host = process.env.HOST || 'localhost';

  app.use('/webpack', proxy({
    target: `http://${host}:${+port + 1}`,
    changeOrigin: true
  }));
}
