const { $ } = require('./dom');
const { addHotkey } = require('./hotkeys');

const reminderModal = $('#add-reminder-modal');
const addReminderBtn = $('#add-reminder-btn');
function toogleReminderModal() {
  reminderModal.classList.toggle('open');
}

addHotkey('a', toogleReminderModal);
addReminderBtn.addEventListener('click', toogleReminderModal);
reminderModal.addEventListener('click', (e) => {
  // if the modal was clicked and not the form
  if (e.target === e.currentTarget) {
    toogleReminderModal();
  }
});
