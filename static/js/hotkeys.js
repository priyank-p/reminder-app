let previousKeypress = null;
let hotkeys = {};

function addHotkey(keyBinding, handler) {
  const useMetaKey = navigator.platform.includes('Mac');
  if (useMetaKey) {
    keyBinding = keyBinding.replace('Ctrl', 'Meta');
  }

  keyBinding = keyBinding.replace('Ctrl', 'Control');
  hotkeys[keyBinding] = handler;
}

function checkHotkeys(e) {
  // for comboKey we don't care it previousKeypress was null
  // since hotkeys[comboKey] will not return a handler
  const currentKey = e.key;
  const comboKey = `${previousKeypress}+${currentKey}`;
  previousKeypress = currentKey;

  const noop = () => {};
  const handler = hotkeys[comboKey] || hotkeys[currentKey] || noop;
  handler(e);
}

document.addEventListener('keydown', checkHotkeys);
module.exports = {
  addHotkey,

  // for use in tests or for debugging purposes
  _checkHotkeys: checkHotkeys,
  get _hotkeys() {
    return hotkeys;
  },

  get _previousKeypress() {
    return previousKeypress;
  }
};
