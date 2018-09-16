const fs = require('fs');
const assert = require('assert');
const path = require('path');
const { RunStub } = require('./stubs');

RunStub.stub();

// stub fs calls to we don't change actual
// data in var/
let pm2File = '';
const fsCalls = {
  existsSync: [],
  readFile: [],
  writeFile: []
};

const originals = {
  existsSync: fs.existsSync,
  readFile: fs.readFile,
  writeFile: fs.writeFile
};

const _fs_exists_sync = fs.existsSync;
const pm2FilePath = path.resolve(__dirname, '../../var/pm2.json');
function StubbedFsExsistSync(filepath) {
  fsCalls.existsSync.push([ filepath ]);
  if (filepath === pm2FilePath) {
    return (pm2File !== '');
  }

  return _fs_exists_sync(filepath);
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
    pm2: RunStub.version,
    node: 'NOT_THE_SAME_VERSION'
  });
  assert(await pm2.shouldRunUpdateCmd());

  pm2File = JSON.stringify({ pm2: RunStub.version.pm2, node: process.version });
  assert.equal(await pm2.shouldRunUpdateCmd(), false);
}

async function test_run_pm2_update_if_needed() {
  RunStub.version.pm2 = 'v2.0.0';
  assert(await pm2.shouldRunUpdateCmd());
  await pm2.runPm2UpdateIfNeeded();
  const expected = JSON.stringify(RunStub.version);
  assert.deepStrictEqual(pm2File, expected);

  const runCalls = RunStub.calls.length;
  const writeCalls = fsCalls.writeFile.length;
  await pm2.shouldRunUpdateCmd();

  // run should be only called once meanwhile
  // writeFile should not be called if the
  // version did not change
  assert.deepEqual(RunStub.calls.length, runCalls + 1);
  assert.deepEqual(fsCalls.writeFile.length, writeCalls);
}

(async function pm2_tests() {
  await test_pm2_should_run_update_cmd();
  await test_run_pm2_update_if_needed();

  // restore stub
  RunStub.restore();
  for (let prop in originals) {
    fs[prop] = originals[prop];
  }
})();
