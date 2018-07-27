class RunStub {
  constructor() {
    this.calls = [];
    this.version = {
      node: process.version,
      pm2: 'v1.0.0'
    };

    this.safeMethods = {};
    this.child_process = require('child_process');

    this.StubbedSpawn = this.StubbedSpawn.bind(this);
    this.handleCommands = this.handleCommands.bind(this);
  }

  stub() {
    this.safeMethods.spawn = this.child_process.spawn;
    this.child_process.spawn = this.StubbedSpawn;
  }

  restore() {
    this.child_process.spawn = this.safeMethods.spawn;
  }

  handleCommands(command, callback) {
    if (command === 'npx pm2 -v') {
      callback(this.version.pm2);
    }
  }

  StubbedSpawn(cmd, args, opts) {
    cmd = cmd.replace(/\.cmd$/, '');
    let command = cmd + ' ' + args.join(' ');
    this.calls.push([ command, opts ]);

    const { handleCommands } = this;
    return {
      on(evt, callback) { callback(0); },
      stderr: { on() {} },
      stdout: {
        on(evt, callback) {
          handleCommands(command, callback);
        }
      }
    };
  }
}


module.exports = {
  RunStub: new RunStub()
};
