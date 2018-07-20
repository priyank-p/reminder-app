const {
  ArgumentRequiredError,
  ArgumentParsingError
} = require('./errors/argparser-errors');

class ArgParser {
  constructor(helpText) {
    this._helpText = helpText;
    this._args = {};
    this._aliases = {};
  }

  /*
    Possible options
     - alias: alias of the argument passed in
     - default: the default value if not passed in
     - type (boolean, string): default string.
     - help: help text for the argument.
     - dest (string): the key.
     - required (boolean): weather or not flag value is required.
  */
  add(arg, opts = {}) {
    const { alias } = opts;
    opts.dest = opts.dest || arg.replace(/^--?/, '');
    this._args[arg] = opts;
    if (alias) {
      this._aliases[alias] = this._args[arg];
    }
  }

  parse(args = process.argv.slice(2)) {
    // clean the array passed in
    args.forEach((value, index) => {
      if (value === '') {
        args.splice(index, 1);
      }
    });

    args.forEach((arg, index) => {
      /* istanbul ignore if: can't test for console.log */
      if (arg === 'help' || arg === '--help' || arg === '-h') {
        console.log(this._helpText);
        process.exit(0);
      }

      if (!this._isArg(arg)) {
        if (!this.nargs) { this.nargs = []; }
        this.nargs.push(arg);
        return;
      }

      const escapedArg = arg.replace(/=.*/, '');
      const opts = this._args[escapedArg] || this._aliases[escapedArg];
      if (!opts) {
        throw new ArgumentParsingError(`unkown argument ${arg} was passed.`);
      }

      let {
        dest,
        type
      } = opts;

      if (type === 'boolean') {
        this[dest] = true;
        return;
      }

      if (this.hasArgValue(arg)) {
        this[dest] = arg.replace(/^--?.+=/, '');
        return;
      }

      // else the value of the arument is next one
      const nextArg = args[index + 1];
      if (this._isArg(nextArg)) { return; }
      this[dest] = nextArg;
    });

    // set the defaults and check for required stuff
    for (let arg in this._args) {
      let { dest, default: _default, required, type } = this._args[arg];
      if (_default && this[dest] === undefined) {
        this[dest] = _default;
      }

      if (type === 'boolean' && this[dest] === undefined) {
        this[dest] = false;
      }

      if (required && this[dest] === undefined) {
        throw new ArgumentRequiredError(`${arg} is required to be passed.`);
      }
    }

    return this;
  }

  _isArg(arg) {
    return /^--?.+/.test(arg);
  }

  hasArgValue(arg) {
    return /^--?.+=.*/.test(arg);
  }
}

module.exports = function argparser(helpText) {
  return new ArgParser(helpText);
};
