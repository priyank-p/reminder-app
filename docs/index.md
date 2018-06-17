# Reminder App Docs

Reminder App - still under development reminder app.

### What does reminder-app use?

Reminder app uses couple of thing underneath the hood:
  * [express](https://expressjs.com) - Express is used for routing,
  and serving all the frontend files.

  * [handlebars](https://github.com/ericf/express-handlebars) - We use handlebars
  as our templating language of choice. See handlebars [documentation here](https:handlebarsjs.com).

  * [webpack](https://webpack.js.org) - Webpack is used for serving frontend files that are capable of
  auto-reloading the webapp when files are edited during development, in production we used frontend files
  built by webpack.

  * [leveldb](https://github.com/level/level) - We used leveldb as our choice of db, its fast and
  with the small layer code of [level-uplevel](https://github.com/priyankp10/level-uplevel) we can do
  migrations and other cool stuff with it.

### Documentation per subsystem/directory:
  * [app directory - all the backend stuff](app-directory.md)
  * [app routes](app-directory.md#routes-directory-and-adding-a-route)
  * [backend-db - models, migrations and level-uplevel](app-directory.md#models-directory)
  * [npm scripts and dependencies](npm-scripts-and-dependencies.md)
  * [node tests](node-tests.md)
  * [tools](tools.md)
  * [var directory](var-directory.md)
  * [static directory - frontend files](static-directory.md)

