import $ from './dom';
import { addHotkey } from './hotkeys';

// add hotkey a to open add reminder modal
const reminderModal = $('#add-reminder-modal') as Element;
addHotkey('a', () => {
  reminderModal.classList.add('open');
});

addHotkey('Escape', () => {
  reminderModal.classList.remove('open');
});

const sidebar: Element = $('.menu-bar') as Element;
addHotkey('s', () => {
  sidebar.classList.toggle('show');
});
