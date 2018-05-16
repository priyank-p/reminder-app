const AppErrors = require('./index');

const ArgumentRequiredErrorDesc = `
This error is thown by argparser, when a argument required to run
a files is not passed in, pass \`help\` or \`-h\` to get more information.
`;
class ArgumentRequiredError extends AppErrors {
  constructor(msg) {
    super(msg, ArgumentRequiredErrorDesc);
  }
}

const ArgumentParsingErrorDesc = `
This error occurs when, argparser encounters a parsing error
when parsing arguments.
`;
class ArgumentParsingError extends AppErrors {
  constructor(msg) {
    super(msg, ArgumentParsingErrorDesc);
  }
}

module.exports = {
  ArgumentRequiredError,
  ArgumentParsingError
};
