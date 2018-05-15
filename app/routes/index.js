const env = require('../env');
const appRoutes = require('./app-routes');
const routes = {
  '/': [appRoutes]
};

const { development } = env;
if (development) {
  const devRoutes = require('./dev-routes');
  routes['/'].push(devRoutes);
}

module.exports = routes;
