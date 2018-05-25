const { $ } = require('./dom');
const request = require('./request');

const reminderModal = $('#add-reminder-modal');
const addReminderBtn = $('#add-reminder-btn');
function toogleReminderModal() {
  reminderModal.classList.toggle('open');
}

addReminderBtn.addEventListener('click', toogleReminderModal);
reminderModal.addEventListener('click', (e) => {
  // if the modal was clicked and not the form
  if (e.target === e.currentTarget) {
    toogleReminderModal();
  }
});

function toggleDropdown(e) {
  const el = e.target;
  el.classList.toggle('show');
}

const dropdowns = $('.dropdown-section .title', 'nodelist');
dropdowns.forEach(dropdown => {
  dropdown.addEventListener('click', toggleDropdown);
});

const reminderForm = $('#add-reminder-modal form');
reminderForm.addEventListener('submit', function (e) {
  const inputElements = e.target.querySelectorAll('input, textarea');
  const reminder = {};
  inputElements.forEach(input => {
    reminder[input.name] = input.value;
  });

  request.post('/api/reminders/add', reminder);
  toogleReminderModal();
  e.preventDefault();
});
