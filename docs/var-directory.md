# var directory

This directory, ignore by git, hold all the development
and app data, such as database and webpack files.

Things stored in `var/` directory:
  - nyc temp files in `nyc` and `.nyc_output` directory.
  - `reminder-app` and/or `reminder-app-{devlopment|test}` databases
  - `webpack-bundles.json` and/or `webpack-dev-bundles.json` to track
  webpack bundles, used by `render_bundle`, handlebars helper.
  - Lastly, `version.js` file use to keep track of migration or other versions.
  - `.eslintcache` is also stored in var, which makes linting a lot faster.
