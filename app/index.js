const path = require('path');
const express = require('express');
const argparser = require('./argparser');
const env = require('./env');

const args = argparser(`
Run rapp server.

--dev, -d    Launch in devlopment mode
`);

args.add('--dev', { alias: '-d', type: 'boolean', default: false });
args.parse();

const development = args.dev;
const production = !development;
env.setEnv('development', development);
env.setEnv('production', production);

const app = express();
const settings = require('./settings');
settings(app);
const STATIC_DIR = path.resolve(__dirname, '../static');
app.use('/static', express.static(STATIC_DIR));

// apply all the routes
const routes = require('./routes');
for (let routePath in routes) {
  const _routes = routes[routePath];
  _routes.forEach(route => {
    app.use(routePath, route);
  });
}

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
