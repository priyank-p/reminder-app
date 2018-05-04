const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();
router.get('/', function (req, res) {
    res.render('index');
});

const dev = process.env.RAPP_DEVELOPMENT === 'true';
if (dev) {
  const COVERAGE_DIR = path.resolve(__dirname, '../var/nyc/lcov-report');
  router.get('/coverage', (req, res) => {
    if (!fs.existsSync(COVERAGE_DIR)) {
      res.setHeader('Content-Type', 'text/html');
      res.send('Run <code>npm run coverage</code> to generate reports, before you can view them.');
      return;
    }

    res.sendFile(path.join(COVERAGE_DIR, 'index.html'));
  });

  router.get('/coverage/:path', (req, res) => {
    console.log(req.path);
    const reqPath = req.path.replace(/^\/coverage\//, '');
    const filePath = path.join(COVERAGE_DIR, reqPath);
    res.sendFile(filePath);
  });
}

module.exports = router;
