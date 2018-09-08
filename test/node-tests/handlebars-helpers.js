const {
  webpack_dev_bundle,
  webpack_prod_bundle
} = fixtures;

const handlebarsHelpers = require('../../app/handlebars-helpers');
const { render_bundle } = handlebarsHelpers;
handlebarsHelpers.__updateBundle(webpack_dev_bundle);

(function test_rendering_wrong_bundle() {
  assert.throws(() => {
    render_bundle('EEXIST');
  });
})();

(function test_correct_html_rendering() {
  const expected = {
    js: '<script src="/webpack/main.js" ></script>\n',
    css: '<link rel="stylesheet" href="/webpack/styles.css" >\n'
  };

  const actual = {
    js: render_bundle('main'),
    css: render_bundle('styles')
  };

  assert.deepStrictEqual(expected['js'], actual['js']);
  assert.deepStrictEqual(expected['css'], actual['css']);
})();

(function test_adding_attributes_to_render_bundle() {
  const expected = {
    js: '<script src="/webpack/main.js" data-js="main-bundle"></script>\n',
    css: '<link rel="stylesheet" href="/webpack/styles.css" data-css="css-bundle">\n'
  };

  const actual = {
    js: render_bundle('main', 'data-js="main-bundle"'),
    css: render_bundle('styles', 'data-css="css-bundle"')
  };

  assert.deepStrictEqual(expected['js'], actual['js']);
  assert.deepStrictEqual(expected['css'], actual['css']);
})();

handlebarsHelpers.__updateBundle(webpack_prod_bundle);
(function test_render_bundle_for_multiple_file_in_bundle() {
  /*
    Test weather the render_bundle handles multips files in one
    entry so two cases:
      - one the map files generated in prod build
      - second multip files to render in one bundle
        i.e js and css in one bundle.
  */
  const expected = {
    js: '<script src="/webpack-bundles/main-122cd28c64172654bd14.js" ></script>\n',
    css: '<script src="/webpack-bundles/reminder-app-bd23999de3211229320.js" ></script>\n'
          + '<link rel="stylesheet" href="/webpack-bundles/styles-bd23999de3211229320.css" >\n'
  };

  const actual = {
    js: render_bundle('main'),
    css: render_bundle('app')
  };

  assert.deepStrictEqual(expected['js'], actual['js']);
  assert.deepStrictEqual(expected['css'], actual['css']);
})();

(function test_preserve_whitespace_function() {
  const reminder = 'Sentence one.\n Sentence Two.\n';
  const actual = handlebarsHelpers.preserve_whitespace(reminder);
  const expected = 'Sentence one.<br> Sentence Two.<br>';
  assert.deepStrictEqual(actual, expected);
})();

(function test_utc_date_helper() {
  const { utc_date } = handlebarsHelpers;
  const date = new Date();
  const actual = utc_date(date);
  const expected = date.toUTCString();

  assert.deepStrictEqual(actual, expected);
  assert.deepStrictEqual(utc_date(), undefined);
})();
