# Tools Documentation

If you are on a Unix system, you can run all the tools with
`./tools/<tool-name>`, but if you are on the window, you will need
to use node to run them, like `node tools/<tool-name>`.

Most of our tools, that run npm executables such as `nodemon` or `webpack`
expects `npx` to be installed, it comes bundled with `npm` since v5.2.x+ if
you don't have `npx`, install it using `npm i -g npx`.

  - `tools/check-migration-version`: checks if `MIGRATION_VERSION` version was bumped
  when the migration files were changed.
  The `tools/version.js` file needs to be updated if this tools throws error.
  - `tools/dev-server`: runs the dev-server.
  - `tools/dev-server.js`: the script that actually spawns the dev-server, and webpack-dev-server.
  - `tools/migration-status.js`: exports a `Boolean` that indicated
    weather migrations are needed to be performed or not.
  - `tools/run-migrations`: performs migrations on database for development db.
  - `tools/run-tests`: runs tests
  - `tools/run.js`: provides a function that emulates `set -x` in bash, and handles cross-platfrom
    spawining issues like for windows `npx` needs to run as `npx.cmd`.
  - `tools/sw-loader.js`: Its a custom webpack plugin that adds
    the version hash if the frontend files are changed so cached files
    could be updated. Also emits `sw-dev.js` file in development.
  - `tools/test-all`: runs all the tests
  - `tools/test-frontend`: runs frontend end to end test using puppetter.
  - `tools/test-migration-helpers.js`: Has helper function needed for migration tests.
  - `tools/test-migrations`: Run tests for migrations.
  - `tools/test-npm-dependencies`: checks weather npm dependencies are pinned to a
  specific version.
  - `tools/webpack`: Build frontend files using webpack only if needed.
  - `tools/webpack-entries.js`: This files has all the webpack entries.
  - `tools/version.js`: Tracks `MIGRATION_VERSION`.
  - `tools/nodemon.json`: nodemon related config.
  - `tools/webpack-info.js`: Holds, hash info and provides caching support.
  - `tools/webpack.config.js` and `tools/webpack.entries.js`: webpack related config.
