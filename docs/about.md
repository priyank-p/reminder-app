### What does reminder-app use?

Reminder app uses couple of thing underneath the hood:
  * [Express](https://expressjs.com) - Express is used for routing,
  and serving all the frontend files.

  * [HandleBars](https://github.com/ericf/express-handlebars) - We use handlebars
  as our templating language of choice. See handlebars [documentation here](https:handlebarsjs.com).

  * [Webpack](https://webpack.js.org) - Webpack is used for serving frontend files that are capable of
  auto-reloading the webapp when files are edited during development, in production we used frontend files
  built by webpack.

  * [LevelDB](https://github.com/level/level) - We used leveldb as our choice of db, its fast and
  with the small layer code of [level-uplevel or uplevel](https://github.com/priyankp10/level-uplevel) we can do
  migrations and other cool stuff with it.
