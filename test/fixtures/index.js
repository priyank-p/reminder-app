const fs = require('fs');
const path = require('path');

function readJSON(filePath) {
  filePath = path.join(__dirname, filePath);

  const content = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(content);
}

module.exports = {
  webpack_dev_bundle: readJSON('webpack_dev_bundle.json'),
  webpack_prod_bundle: readJSON('webpack_prod_bundle.json')
};
