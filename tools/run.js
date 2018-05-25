const { spawn } = require('child_process');

const defaultOpts = {
  cwd: __dirname,
  env: process.env,
  stdio: 'pipe'
};

function run(commandToRun, passedOpts = {}) {
  const args = commandToRun.split(' ');
  const cmd = args[0];
  args.splice(0, 1);

  if (!passedOpts.silent) {
    console.log('+', commandToRun);
  }

  delete passedOpts.silent;
  const opts = { ...defaultOpts, ...passedOpts };
  const proc = spawn(cmd, args, opts);

  return new Promise((resolve, reject) => {
    function check(code) {
      if (code != 0) {
        reject();
        return;
      }

      resolve();
    }

    proc.on('exit', check);
    proc.on('close', check);
    proc.on('error', reject);
  });
}

module.exports = run;
