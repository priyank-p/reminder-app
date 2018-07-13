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

const hotkeys = require('../../static/js/hotkeys');
const {
  _hotkeys, _checkHotkeys, _disabledHotkeys
} = hotkeys;

const noop = () => {};
const target = {
  target: {
    tagName: 'DIV'
  }
};

(function test_addHotkeys_function() {
  hotkeys.addHotkey('Ctrl+P', noop);
  assert.deepStrictEqual(_hotkeys()['Control+P'], noop);

  // test that in mac platforms it uses meta key
  global.navigator.platform = 'MacIntel';
  hotkeys.addHotkey('Ctrl+P', noop);
  assert.deepStrictEqual(_hotkeys()['Meta+P'], noop);

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
  assert.deepStrictEqual(_hotkeys()['a'], singleHotkey.handler);
  assert.deepStrictEqual(_hotkeys()['Control+a'], comboHotkey.handler);

  _checkHotkeys({ key: 'a', ...target });
  assert.deepStrictEqual(hotkeys._previousKeypress(), 'a');

  _checkHotkeys({ key: 'Control', ...target });
  assert.deepStrictEqual(hotkeys._previousKeypress(), 'Control');
  _checkHotkeys({ key: 'a', ...target });
  assert.deepStrictEqual(hotkeys._previousKeypress(), 'a');

  // check that hotkeys are not triggred if
  // it input or textarea
  _checkHotkeys({ key: 'a', target: { tagName: 'INPUT' } });
  _checkHotkeys({ key: 'a', target: { tagName: 'TEXTAREA' } });

  // check that each of the function is **only** called once
  assert.deepStrictEqual(singleHotkey.count, 1);
  assert.deepStrictEqual(comboHotkey.count, 1);
})();

(function test_disable_hotkeys_function() {
  let called = false;
  hotkeys.addHotkey('Ctrl+D', () => { called = true; });
  hotkeys.disableHotkey('Ctrl+D');

  // trigger hotkey: Ctrl+D
  _checkHotkeys({ key: 'Control', ...target });
  _checkHotkeys({ key: 'D', ...target });

  const isDisabled = hotkeys.isHotkeyDisabled('Ctrl+D');
  assert.deepStrictEqual(called, false);
  assert.deepStrictEqual(isDisabled, true);
})();

(function test_reEnabled_hotkey_function() {
  let called = false;
  hotkeys.addHotkey('d', () => { called = true; });
  hotkeys.disableHotkey('d');
  _checkHotkeys({ key: 'd', ...target });

  let isDisabled = hotkeys.isHotkeyDisabled('d');
  assert.deepStrictEqual(called, false);
  assert.deepStrictEqual(isDisabled, true);

  hotkeys.reEnableHotkey('d');
  _checkHotkeys({ key: 'd', ...target });
  isDisabled = hotkeys.isHotkeyDisabled('d');

  assert.deepStrictEqual(called, true);
  assert.deepStrictEqual(isDisabled, false);
})();

(function test_reEnabling_not_added_hotkey() {
  // first make sure it not yet disabled!
  assert.deepStrictEqual(_disabledHotkeys()['Not_Added'], undefined);
  assert.throws(() => {
    hotkeys.reEnableHotkey('Not_Added');
  }, /^Error: Cannot re-enable hotkey that not disabled!/);
})();
