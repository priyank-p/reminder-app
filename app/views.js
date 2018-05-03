const path = require('path');
const fs = require('fs');

module.exports = (app) => {
  app.get('/', function (req, res) {
      res.render('index');
  });

  const dev = process.env.RAPP_DEVELOPMENT === 'true';
  if (dev) {
    const COVERAGE_DIR = path.resolve(__dirname, '../var/nyc/lcov-report');
    const coverageAvalible = fs.existsSync(COVERAGE_DIR);
    app.get('/coverage', (req, res) => {
      if (!coverageAvalible) {
        res.setHeader('Content-Type', 'text/html');
        res.write('Run <code>npx nyc ./tools/run-tests</code>');
      }

      res.sendFile(path.join(COVERAGE_DIR, 'index.html'));
    });

    app.get('/coverage/:path', (req, res) => {
      const reqPath = req.path.replace(/^\/coverage\//, '');
      const filePath = path.join(COVERAGE_DIR, reqPath);
      res.sendFile(filePath);
    });
  }
};
