let previousKeypress = null;
let hotkeys = {};
let disabledHotkeys = [];

function getHotkey(keyBinding) {
  const useMetaKey = navigator.platform.includes('Mac');
  if (useMetaKey) {
    keyBinding = keyBinding.replace('Ctrl', 'Meta');
  }

  keyBinding = keyBinding.replace('Ctrl', 'Control');
  return keyBinding;
}

function addHotkey(keyBinding, handler) {
  keyBinding = getHotkey(keyBinding);
  hotkeys[keyBinding] = handler;
}

function disableHotkey(hotkey) {
  // TODO: Maybe consider throwing error when disabling hotkey
  // that is not yet added?
  hotkey = getHotkey(hotkey);
  disabledHotkeys.push(hotkey);
}

function reEnableHotkey(hotkey) {
  if (!disabledHotkeys.includes(hotkey)) {
    throw new Error('Cannot re-enable hotkey that not disabled!');
  }

  const pos = hotkey.indexOf(hotkey);
  disabledHotkeys.splice(pos , 1);
}

function isHotkeyDisabled(hotkey) {
  // this is not needed to be done if called by
  // checkHotkeys though since we export this function
  // we make sure it work with Ctrl+key or Control+key.
  hotkey = getHotkey(hotkey);
  return disabledHotkeys.includes(hotkey);
}

function checkHotkeys(e) {
  // for comboKey we don't care it previousKeypress was null
  // since hotkeys[comboKey] will not return a handler
  const currentKey = e.key;
  const comboKey = `${previousKeypress}+${currentKey}`;
  previousKeypress = currentKey;

  // figure out which hotkey to use
  // comboKey is the priority
  const useCombokey = hotkeys[comboKey] || false;
  const useSinglekey = hotkeys[currentKey] || false;

  if (useCombokey && isHotkeyDisabled(comboKey)) {
    return;
  }

  if (useSinglekey && isHotkeyDisabled(currentKey)) {
    return;
  }

  const noop = () => {};
  const handler = hotkeys[comboKey] || hotkeys[currentKey] || noop;
  handler(e);
}

document.addEventListener('keydown', checkHotkeys);
module.exports = {
  addHotkey,
  disableHotkey,
  isHotkeyDisabled,
  reEnableHotkey,

  // for use in tests or for debugging purposes
  _checkHotkeys: checkHotkeys,
  get _hotkeys() {
    return hotkeys;
  },

  get _disabledHotkeys() {
    return disabledHotkeys;
  },

  get _previousKeypress() {
    return previousKeypress;
  }
};
