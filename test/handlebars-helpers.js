const assert = require('assert');
const path = require('path');
const fs = require('fs');
const _fs = Object.assign({},fs);

const {
  webpack_dev_bundle,
  webpack_prod_bundle
} = require('./fixtures');

let currentBundle = webpack_dev_bundle;
const bundleFile = path.resolve(__dirname, '../var/webpack-bundles.json');
fs.readFileSync = (...args) => {
  if (args[0] !== bundleFile) {
    return _fs.readFileSync(...args);
  }

  return JSON.stringify(currentBundle);
};

let { render_bundle } = require('../server/handlebars-helpers')
describe('handlebars-helpers tests', () => {
  describe('render_bundle tests', () => {
    it('throws error is bundle does not exsist', () => {
      assert.throws(() => {
        render_bundle('EEXIST');
      });
    });

    it('renders bundles correctly', () => {
      const expected = {
        js: `<script src="/webpack/main.js" >`,
        css: `<link rel="stylesheet" href="/webpack/styles.css" >`
      };

      const actual = {
        js: render_bundle('main'),
        css: render_bundle('styles')
      };

      assert.deepStrictEqual(expected['js'], actual['js']);
      assert.deepStrictEqual(expected['css'], actual['css']);
    });
  });
});
