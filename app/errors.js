/*
  Goal here is to have extenable custom error
  to have better stack trace. The main benefit is let
  say we have a FieldRequiredError somewhere the ideal thing to do is
  throw new Error('FiledRequiredError: ...error');
  the first line would be: `Error: FiledRequiredError: ...error` which is rather
  not clear or estatic.
*/

class RAPPErrors extends Error {
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

const ArgumentRequiredErrorDesc = `
This error is thown by argparser, when a argument required to run
a files is not passed in, pass \`help\` or \`-h\` to get more information.
`;
class ArgumentRequiredError extends RAPPErrors {
  constructor(msg) {
    super(msg, ArgumentRequiredErrorDesc);
  }
}

const ArgumentParsingErrorDesc = `
This error occurs when, argparser encounters a parsing error
when parsing arguments.
`;
class ArgumentParsingError extends RAPPErrors {
  constructor(msg) {
    super(msg, ArgumentParsingErrorDesc);
  }
}

module.exports = {
  RAPPErrors,
  ArgumentRequiredError,
  ArgumentParsingError
};
