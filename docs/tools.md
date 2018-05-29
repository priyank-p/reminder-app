# Tools Documentation

If you are on a Unix system, you can run all the tools with
`./tools/<tool-name>`, but if you are on the window, you will need
to use node to run them, like `node tools/<tool-name>`.

Most of our tools, that run npm executables such as `nodemon` or `webpack`
expects `npx` to be installed, it comes bundled with `npm` since v5.2.x+ if
you don't have `npx`, install it using `npm i -g npx`.

  - `tools/dev-server`: runs the dev-server.
  - `tools/migration-status.js`: exports a `Boolean` that indicated
    weather migrations are need performed or not.
  - `tools/run-migrations`: performs migrations on database for devlopment db.
  - `tools/run-tests`: runs tests
  - `tools/run.js`: provides a function that emulates `set -x` in bash.
  - `tools/test-all`: runs all the tests
  - `tools/test-npm-dependencies`: checks weather npm dependencies are pinned to a
  specific version.
  - `tools/nodemon.json`: nodemon related config.
  - `tools/webpack.config.js` and `tools/webpack.entries.js`: webpack related config.
