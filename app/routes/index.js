const development = process.env.RAPP_DEVELOPMENT === 'true';
const appRoutes = require('./app-routes');
const routes = {
  '/': [appRoutes]
};

if (development) {
  const devRoutes = require('./dev-routes');
  routes['/'].push(devRoutes);
}

module.exports = routes;
