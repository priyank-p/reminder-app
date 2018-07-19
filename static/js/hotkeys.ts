let previousKeypress: string | null = null;
let hotkeys: object = {};
let disabledHotkeys: string[] = [];

export function getHotkey(keyBinding: string): string {
  const useMetaKey: boolean = navigator.platform.includes('Mac');
  if (useMetaKey) {
    keyBinding = keyBinding.replace('Ctrl', 'Meta');
  }

  keyBinding = keyBinding.replace('Ctrl', 'Control');
  return keyBinding;
}

export function addHotkey(keyBinding: string, handler: Function) {
  keyBinding = getHotkey(keyBinding);
  hotkeys[keyBinding] = handler;
}

export function disableHotkey(hotkey: string) {
  // TODO: Maybe consider throwing error when disabling hotkey
  // that is not yet added?
  hotkey = getHotkey(hotkey);
  disabledHotkeys.push(hotkey);
}

export function reEnableHotkey(hotkey: string) {
  hotkey = getHotkey(hotkey);
  if (!disabledHotkeys.includes(hotkey)) {
    throw new Error('Cannot re-enable hotkey that not disabled!');
  }

  const pos = disabledHotkeys.indexOf(hotkey);
  disabledHotkeys.splice(pos, 1);
}

export function isHotkeyDisabled(hotkey: string): boolean {
  // this is not needed to be done if called by
  // checkHotkeys though since we export this function
  // we make sure it work with Ctrl+key or Control+key.
  hotkey = getHotkey(hotkey);
  return disabledHotkeys.includes(hotkey);
}

export function checkHotkeys(e: KeyboardEvent) {
  // we don't want to trigger an event if the
  // user is typing something.
  const el = e.target as Element;
  const isInputElement = /input|textarea/i;
  if (isInputElement.test(el.tagName)) {
    return;
  }

  // for comboKey we don't care it previousKeypress was null
  // since hotkeys[comboKey] will not return a handler
  const currentKey: string = e.key;
  const comboKey: string = `${previousKeypress}+${currentKey}`;
  previousKeypress = currentKey;

  // figure out which hotkey to use
  // comboKey is the priority
  const useCombokey: string | boolean = hotkeys[comboKey] || false;
  const useSinglekey: string | boolean = hotkeys[currentKey] || false;

  if (useCombokey && isHotkeyDisabled(comboKey)) {
    return;
  }

  if (useSinglekey && isHotkeyDisabled(currentKey)) {
    return;
  }

  const noop: Function =  () => {};
  const handler: Function = hotkeys[comboKey] || hotkeys[currentKey] || noop;
  handler(e);
}

document.addEventListener('keydown', checkHotkeys);

// for use in tests or for debugging purposes
export const _checkHotkeys = checkHotkeys;
export function _hotkeys() {
  return hotkeys;
}

export function _disabledHotkeys() {
  return disabledHotkeys;
}

export function _previousKeypress() {
  return previousKeypress;
}
