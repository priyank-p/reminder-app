/*
  Goal here is to have extendable custom error
  to have better stack trace. The main benefit is let
  say we have a FieldRequiredError somewhere the ideal thing to do is
  throw new Error('FiledRequiredError: ...error');
  the first line would be: `Error: FiledRequiredError: ...error` which is rather
  not clear or estatic. Rather with custom error message we can provide clear error
  message title and then a full traceback at the end which is much more nicer of way
  to handle errors.
*/

class AppErrors extends Error {
  constructor(msg, errorDescription) {
    super(msg);
    this.name = this.constructor.name; // the name will be the class extending this

    /* istanbul ignore else: just for old node version compatibility */
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(msg)).stack;
    }

    if (errorDescription) {
      this.stack += '\n' + errorDescription;
    }
  }
}

module.exports = AppErrors;
