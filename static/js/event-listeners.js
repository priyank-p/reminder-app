const { $ } = require('./dom');
const request = require('./request');
const dateFormat = require('dateformat');

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

  if (reminder.due_date) {
    const time = reminder.due_time ? 'T' + reminder.due_time : '';
    reminder.due_date = new Date(reminder.due_date + time);
  }

  delete reminder.due_time;
  request.post('/api/reminders/add', reminder)
    .then(() => {
      window.location.reload();
    });
  toogleReminderModal();
  e.preventDefault();
});


// set the due date of the .quick-choose -
// the quick due date picker, we get a number
// and we update the due date fields, the due_time
// would be by default 12 PM
const inputBaseSelector = '#add-reminder-modal form';
const dueDateInput = $(`${inputBaseSelector} input[type="date"]`);
const dueTimeInput = $(`${inputBaseSelector} input[type="time"]`);
function setDueDate(n) {
  if (isNaN(n)) {
    return;
  }

  // its possible to enter negative number despite
  // the the input min/max attributes...
  // to avoid infinite loop
  if (n < 0) {
    return;
  }

  // this is required because even though
  // Date object is smart about month rollover
  // it can't increment 10 days from last to second day
  const date = new Date();
  for (let i = 0; i < n; i++) {
    date.setDate(date.getDate() + 1);
  }

  // the value muse be in standard yyyy-mm-dd format
  dueDateInput.value = dateFormat(date, 'yyyy-mm-dd');
  if (dueTimeInput.value === '') {
    dueTimeInput.value = '12:00';
  }
}

const quickDueDatePicker = $('.quick-choose input');
quickDueDatePicker.addEventListener('input', (e) => {
  const el = e.target;
  setDueDate(el.value);
});

const reminders = $('.reminders');
reminders.addEventListener('click', (e) => {
  const el = e.target;
  if (el.classList.contains('delete-reminder')) {
    const reminder = el.parentElement;
    const id = reminder.getAttribute('data-id');
    request.delete(`/api/reminders/delete/${id}`)
      .then(() => {
        reminder.parentElement.removeChild(reminder);
      });
  }
});
