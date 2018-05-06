let previousKeypress = null;
let hotkeys = {};

let noop = () => {};

// TODO: Should we support lowercase too???
function addHotkey(keyBinding, handler) {
  hotkeys[keyBinding] = handler;
}

function checkHotkey(e) {
  // for comboKey we don't care it previousKeypress was null
  // since hotkeys[comboKey] will not return a handler
  const currentKey = e.key;
  const comboKey = `${previousKeypress}+${currentKey}`;
  previousKeypress = currentKey;

  // we get both, single key's handler and combo key handler
  // since there could be a single key handler and a combo handler i.e
  //  Ctrl+O and O
  const singleKeyHandler = hotkeys[currentKey] || noop;
  const comboKeyHandler = hotkeys[comboKey] || noop;
  singleKeyHandler();
  comboKeyHandler();
}

document.addEventListener('keypress', checkHotkey);
module.exports = {
  addHotkey,

  // for tests or for internal use.
  get _hotkeys() {
    return hotkeys;
  },

  get _previousKeypress() {
    return previousKeypress;
  }
};
