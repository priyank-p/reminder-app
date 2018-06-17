# var directory

This directory is ignored by git. It holds all the development
and app data, such as database and webpack bundle files.

Some of the things stored in `var/` directory:
  - nyc temp files in `nyc` and `.nyc_output` directory.
  - `reminder-app` and/or `reminder-app-{development|test}` databases
  - `webpack-bundles.json` and/or `webpack-dev-bundles.json` to track
  webpack bundles, used by `render_bundle`, handlebars helper.
  - Lastly, `version.js` file use to keep track of migration or other versions.
  - `.eslintcache` is also stored in var, which makes linting a lot faster.
