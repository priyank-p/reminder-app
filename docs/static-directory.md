# `static` directory - frontend files

The static directory holds all the frontend files,
some of which are named in a pretty self-explantory way:
  * `static/js` - Holds all the javascript files for the frontend,
  we use commonjs syntax, which is compiled by webpack to make it run in
  a browser, it is possible to use ES6 `export/import` syntax, most of the files
  currently don't use, simply because we want to require the code in tests
  without any special syntax.

  * `static/scss` - This directory contains all the css files, we use `scss` for the
  css. If you are not familiar with scss take a look at [this documentation](https://sass-lang.com/guide).
  Couple of interesting files in that directory `var.scss` holds all the variables like, `$font-size`, `$theme-color`
  which we can modifiy and it should update the color, of font-size across the app which is awesome.
  Another note, since we use webpack any update to scss files in development are hot-reloaded in browsers,
  meaning updated without reload in browser, which make development and web designing much more pleasant.

  * `static/templates` - All the frontend html templates lives here, all the main page files should
  go on top level here, but there is one more directory called `partials` which holds, handlebars templates
  which we can require anywhere in templates, like `{{> partial-name-without-.hbs.extension }}`. Its possible
  to use handlebars helpers here, all the helpers are currently located at `app/handlebars-helpers.js` files,
  if you want to add one you will need to create the helper there and export it.

  * `static/webpack-bundles` - created when you run `npm run build`, holds all the created
frontend files by webpack, all the files will have sourcemaps, and hashes in files names. The file name are updated
  across templates using the `render_bundle` handlebars helpers.

## Webpack Process

When the dev server runs, using `tools/dev-server`, we start the `webpack-dev-server`
alongside with the express/node server. Then we create a proxy, which routes all the request
from `/webpack` to `webpack-dev-server`. The whole proxy thing is done using `http-proxy-middleware`
in the `app/index.js` file.

The webpack config `webpack.config.js` unlike most project, is not actually on
the top-level but is located in `tools/webpack.config.js` to avoid clutter in the root
directory of the project. We organized the webpack entry point in `tools/webpack.entry.js`
file.

The webpack process handles all the frontend files.

## Rendering webpack bundles

To render new webpack bundles, you will need to use a handlebars helper called
`render_bundles` this accepts two arguments, the first one is webpack bundle name
from `tools/webpack.entries.js` and the other argument which is optional the html
attributes to add. And the call must be inside handlebars triple braces `{{{` since
it addes html,  so we will want it to be unescaped.

The `render_bundle` helpers handle a couple of things, it can also render html, css
as `<script>` and `<link>`. It also supports multiple files in one entry so its possible
to render both `css`, `js` mixed bundle. It will adjust the link to have the file hash 
for the file name in production.

```
// to render a webpack bundle called "main"
{{{ render_bundle 'main' 'async' }}}

// would lead to this output
<script src="<link>" async></script>
```
