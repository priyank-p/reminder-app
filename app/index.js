const argparser = require('./argparser');
const env = require('./env');

const args = argparser(`
Run rapp server.

--dev, -d    Launch in development mode
`);

args.add('--dev', { alias: '-d', type: 'boolean', default: false });
args.parse();

env.setEnv('development', args.dev);
env.setEnv('production', !args.dev);

if (env.development) {
  env.setEnv('mode', 'development');
}

// load all the app  modules later once
// the env is set so they apply correct
// setting depending the mode (production | development)
const path = require('path');
const express = require('express');
const settings = require('./settings');
const routes = require('./routes');

const app = express();
const tracker = require('./tracker'); // eslint-disable-line no-unused-vars
const STATIC_DIR = path.resolve(__dirname, '../static');
settings(app);
app.use('/static', express.static(STATIC_DIR));

// apply all the routes
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

// if development respond to /webpack from webpack-dev-server
if (env.development) {
  const proxy = require('http-proxy-middleware');
  const host = process.env.HOST || 'localhost';

  app.use('/webpack', proxy({
    target: `http://${host}:${+port + 1}`,
    changeOrigin: true,
    onError(err, req, res) {
      res.setHeader('Content-Type', 'applications/javascript');
      res.send(`
         window.addEventListener('DOMContentLoaded', () => {
           document.body.innerHTML = 'Webpack process in not, yet started, please\n';
           document.body.innerHTML += 'reload in couple of mintes';
         });
      `);
    }
  }));
}
