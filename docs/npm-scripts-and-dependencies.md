# npm-scripts and dependencies

npm-scripts:
   * `npm run dev` - starts the dev envoirment.
   * `npm run build` - build the frontend files for production
   * `npm run migrations` - run the migrations in database.
   * `npm test` - runs all the tests, `tools/test-all`
   * `npm run prod` - runs the app in production mode.
   * `npm run coverage` - gets the coverage report of test, will be
   at `var/nyc/lcov-report/index.html`

#### npm dependencies
We prefer to have pinned dependencies for every npm package. This should
allow us to avoid any breakage in app due to an upstream breaking changes.
