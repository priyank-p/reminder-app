const path = require('path');
const express = require('express');
const settings = require('./settings');
const argparser = require('./argparser');
const routes = require('./routes');

const args = argparser(`
Run rapp server.

--dev, -d    Launch in devlopment mode
`);

args.add('--dev', { alias: '-d', type: 'boolean', default: false });
args.parse();

const development = args.dev;
const production = !development;
process.env.RAPP_DEVELOPMENT = development;
process.env.RAPP_PRODUCTION = production;

const app = express();
const STATIC_DIR = path.resolve(__dirname, '../static');
app.use('/static', express.static(STATIC_DIR));
app.use('/', routes);

settings(app);

const port = process.env.PORT || 7213;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

// if devlopment respond to /webpack from webpack-dev-server
if (development) {
  const proxy = require('http-proxy-middleware');
  const host = process.env.HOST || 'localhost';

  app.use('/webpack', proxy({
    target: `http://${host}:${+port + 1}`,
    changeOrigin: true
  }));
}
