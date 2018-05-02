class ArgParser {
  constructor(helpText) {
    this.helpText = helpText;
    this.args = {};
    this.aliases = {};
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
  add(arg, opts) {
    const { alias } = opts;
    opts.dest = opts.dest || arg.replace(/^--?/, '');
    this.args[arg] = opts;
    if (alias) {
      this.aliases[alias] = this.args[arg];
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
      if (arg === 'help' || arg === '-h') {
        console.log(this.helpText);
      }

      // check if it a arg is not return for now..!
      if (!this.isArg(arg)) { return; }

      const opts = this.args[arg] || this.aliases[arg];
      if (!opts) {
        throw new Error(`ArgumentParsingError: unkown argument ${arg} was passed.`);
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
      if (this.isArg(nextArg)) { return; }
      this[dest] = nextArg;
    });

    // set the defaults and check for required stuff
    for (let arg in this.args) {
      let { dest, default: _default, required, type } = this.args[arg];
      if (_default && this[dest] !== undefined) {
        this[dest] = _default;
      }

      if (type === 'boolean' && this[dest] === undefined) {
        this[dest] = false;
      }

      if (required && this[dest] === undefined) {
        throw new Error(`ArgumentRequiredError: ${arg} is required to be passed.`);
      }
    }

    return this;
  }

  isArg(arg) {
    return /^--?.+/.test(arg);
  }

  hasArgValue(arg) {
    return /^--?.+=.*/.test(arg);
  }
}

module.exports = function argparser(helpText) {
  return new ArgParser(helpText);
};
