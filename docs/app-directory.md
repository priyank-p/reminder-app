# The app directory

The app directory holds all the backend files. The backend uses
express.

## Information about some top-level files

  * `env.js` - Just a simple module, we use to hold
  data that could be accessed from anywhere in the codebase.
  * `handlebars-helpers` - Helpers used when rendering templates located at
  `static/templates`, once you add a helper function just export it and it will
  be available in the templates.
  * `settings.js` - File that sets all the required setting like `view engine`,
  and using `helmet` in production.
  * `argparser.js` - Used to parse command line arguments.

### `routes` directory and adding a route.
If you need to add a route to an existing file in `routes`, there is nothing
more special to do, it should be applied.

If you need to add a new file, you will need to use `express.Router` to add
the routes, and export the router, then you'll need to `require` it in the `index.js`
and add it to the `routes` object in the file.

#### `models` directory
The models directory holds, all the backend models for db. We use
leveldb which is super fast, no-sql db, we don't use leveldb directory
since you just store a key, and a pair, which could work if we set all the
reminders which is json into one key, but that not ideal. We needed something
that can store things in a more organized way, so we use a package called `level-uplevel`
created by [priyank](https://github.com/priyankp10) which allows the data to be
store in a more organized way.

By using the `level-uplevel` package we can also do migrations which are really neat
when a thing changes.

#### `errors` directory

We use custom error in the backend, the main constructor is exported
in `error/index.js`, that class can be used to create a custom error
as shown below, and for more context, you can take a look at `errors/argparser-error.js`.
We use custom error because it provides more readable error msg and then a clear same trackback
as errors below. The clear error message and seeing `SomeErrorType: ` instead of `Error: SomeErrorType`
really helps.

```javascript
const AppErrors = require('./errors');

const InvalidFieldErrorDesc = `
The value passed into the field is invalid.
  We recently changed to use a new type of this error field so you may need to adjust your code accordingly.
`

class InvalidFieldError extends AppError {
  constructor(msg) {
    super(msg, InvalidFieldError);
  }
}
```
