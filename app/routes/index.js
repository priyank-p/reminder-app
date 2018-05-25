const env = require('../env');
const appRoutes = require('./app-routes');
const apiRoutes = require('./api');
const routes = {
  '/': [appRoutes],
  '/api': [apiRoutes]
};

const { development } = env;
if (development) {
  const devRoutes = require('./dev-routes');
  routes['/'].push(devRoutes);
}

module.exports = routes;
