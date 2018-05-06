// setup globals
let hotkeyHandler = null;
global.document = {
  addEventListener(type, func) {
    hotkeyHandler = func;
  }
};

const hotkeys = require('../static/js/hotkeys');
const hotkeysHandlerCounts =  {
  'a': 0,
  'Ctrl+b': 0
};

assert.deepStrictEqual(hotkeys._hotkeys, {});

hotkeys.addHotkey('a', () => {
  hotkeysHandlerCounts.a++;
});
hotkeys.addHotkey('Ctrl+b', () => {
  hotkeysHandlerCounts['Ctrl+b']++;
});
assert.notDeepEqual(hotkeys._hotkeys, undefined);

hotkeyHandler({ key: 'a' });
assert.deepStrictEqual(hotkeysHandlerCounts.a, 1);

hotkeyHandler({ key: 'Ctrl' });
hotkeyHandler({ key: 'b' });
assert.deepStrictEqual(hotkeysHandlerCounts['Ctrl+b'], 1);
