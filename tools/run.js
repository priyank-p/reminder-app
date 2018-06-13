const { spawn } = require('child_process');

const defaultOpts = {
  cwd: __dirname,
  env: process.env,
  stdio: 'inherit'
};

function run(commandToRun, passedOpts = {}) {
  const args = commandToRun.split(' ');
  const cmd = args[0];
  args.splice(0, 1);

  if (!passedOpts.silent) {
    console.log('+', commandToRun);
  }

  if (passedOpts.capture) {
    passedOpts.stdio = 'pipe';
    delete passedOpts.capture;
  }

  delete passedOpts.silent;
  const opts = { ...defaultOpts, ...passedOpts };
  const proc = spawn(cmd, args, opts);

  let output = '';
  return new Promise((resolve, reject) => {
    function check(code) {
      if (code != 0) {
        reject(code, output);
        return;
      }

      resolve(output);
    }

    if (opts.stdio === 'pipe') {
      proc.stdout.on('data', data => { output += data; });
      proc.stderr.on('data', data => { output += data; });
    }

    proc.on('exit', check);
    proc.on('close', check);
    proc.on('error', reject);
  });
}

module.exports = run;
