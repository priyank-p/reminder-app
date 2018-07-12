import $ from './dom';
import { addHotkey } from './hotkeys';

// add hotkey a to open add reminder modal
const reminderModal = <Element> $('#add-reminder-modal');
addHotkey('a', () => {
  reminderModal.classList.add('open');
});
