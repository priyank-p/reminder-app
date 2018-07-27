const fs = require('fs');
const assert = require('assert');
const child_process = require('child_process');

// stub child_process.spawn so no actual
// commands are ran!
const runData = [];
const version = {
  pm2: 'v1.0.0'
};

function StubbedSpawn(cmd, args, opts) {
  cmd = cmd.replace(/\.cmd$/, '');
  let command = cmd + ' ' + args.join(' ');
  runData.push([ command, opts ]);

  return {
    on(evt, callback) { callback(0); },
    stderr: { on() {} },
    stdout: {
      on(evt, callback) {
        if (command === 'npx pm2 -v') {
          callback(version.pm2);
        }
      }
    }
  };
}

child_process.spawn = StubbedSpawn;

// stub fs calls to we don't change actual
// data in var/
let pm2File = '';
const fsCalls = {
  existsSync: [],
  readFile: [],
  writeFile: []
};

function StubbedFsExsistSync(filepath) {
  fsCalls.existsSync.push([ filepath ]);
  return (pm2File !== '');
}

function StubbedFsReadFile(filepath, encoding, callback) {
  fsCalls.readFile.push([ filepath ]);
  callback(null, pm2File);
}

function StubbedFsWriteFile(filepath, content, encoding, callback) {
  fsCalls.writeFile.push([ filepath, content ]);
  pm2File = content;
  callback(null);
}

fs.existsSync = StubbedFsExsistSync;
fs.readFile = StubbedFsReadFile;
fs.writeFile = StubbedFsWriteFile;

const pm2 = require('../../scripts/pm2');
async function test_pm2_should_run_update_cmd() {
  assert(pm2File === '');
  assert(await pm2.shouldRunUpdateCmd());

  pm2File = JSON.stringify({
    pm2: 'NO_THE_SAME_VERSION',
    node: process.version
  });
  assert(await pm2.shouldRunUpdateCmd());

  pm2File = JSON.stringify({
    pm2: version.pm2,
    node: 'NOT_THE_SAME_VERSION'
  });
  assert(await pm2.shouldRunUpdateCmd());

  pm2File = JSON.stringify({ pm2: version.pm2, node: process.version });
  assert.equal(await pm2.shouldRunUpdateCmd(), false);
}

(async function pm2_tests() {
  await test_pm2_should_run_update_cmd();
})();
