const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const COVERAGE_DIR = path.resolve(__dirname, '../../var/nyc/lcov-report');

router.get('/coverage', (req, res) => {
  // if we send coverage report on /coverage
  // the css and js files are borken since the request
  // is sent to / when the coverage js/css are sent if the
  // request is made from /coverage/
  res.redirect('/coverage/index.html');
});

router.get('/coverage/', (req, res) => {
  if (!fs.existsSync(COVERAGE_DIR)) {
    res.setHeader('Content-Type', 'text/html');
    res.send('Run <code>npm run coverage</code> to generate reports, before you can view them.');
    return;
  }

  res.sendFile(path.join(COVERAGE_DIR, 'index.html'));
});

router.get('/coverage/*', (req, res) => {
  const reqPath = req.path.replace(/^\/coverage\//, '');
  const filePath = path.join(COVERAGE_DIR, reqPath);
  res.sendFile(filePath);
});

module.exports = router;
