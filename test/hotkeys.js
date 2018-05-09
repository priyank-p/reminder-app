// setup globals
global.document = {
  eventHandler: null,
  addEventListener(type, func) {
    this.eventHandler = func;
  }
};

global.navigator = {
  platform: 'Win32'
};

const hotkeys = require('../static/js/hotkeys');
const { _hotkeys, _checkHotkeys } = hotkeys;
const noop = () => {};

(function test_addHotkeys_function() {
  hotkeys.addHotkey('Ctrl+P', noop);
  assert.deepStrictEqual(_hotkeys['Control+P'], noop);

  // test that in mac platforms it uses meta key
  global.navigator.platform = 'MacIntel';
  hotkeys.addHotkey('Ctrl+P', noop);
  assert.deepStrictEqual(_hotkeys['Meta+P'], noop);

  // reset stuff
  global.navigator.platform = 'Win32';
})();

function getCountTracker() {
  let count = 0;
  return {
    get count() {
      return count;
    },
    handler() { count++; }
  };
}

(function test_checkHotkeys_function() {
  const singleHotkey = getCountTracker();
  const comboHotkey = getCountTracker();

  hotkeys.addHotkey('a', singleHotkey.handler);
  hotkeys.addHotkey('Ctrl+a', comboHotkey.handler);
  assert.deepStrictEqual(_hotkeys['a'], singleHotkey.handler);
  assert.deepStrictEqual(_hotkeys['Control+a'], comboHotkey.handler);

  _checkHotkeys({ key: 'a' });
  assert.deepStrictEqual(hotkeys._previousKeypress, 'a');

  _checkHotkeys({ key: 'Control' });
  assert.deepStrictEqual(hotkeys._previousKeypress, 'Control');
  _checkHotkeys({ key: 'a' });
  assert.deepStrictEqual(hotkeys._previousKeypress, 'a');

  // check that each of the function is **only** called once
  assert.deepStrictEqual(singleHotkey.count, 1);
  assert.deepStrictEqual(comboHotkey.count, 1);
})();
