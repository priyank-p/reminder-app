import $ from './dom';
import * as request from './request';
import * as editingUI from './editing-ui';
import dateFormat from 'dateformat';
import { getReminder } from './reminder-utils.js';

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
  const reminder = getReminder(e.target, { isEditingUI: false });
  request.post('/api/reminders/add', { body: reminder })
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

function hasClass(el, _class) {
  return el.classList.contains(_class);
}

function hideContextMenus() {
  $('.menu.show', 'nodelist').forEach(el => {
    el.classList.remove('show');
  });
}

const reminders = $('.reminders');
reminders.addEventListener('click', (e) => {
  const el = e.target;
  const reminder = el.parentElement.parentElement.parentElement;
  const id = reminder.getAttribute('data-id');

  if (hasClass(el, 'delete-reminder')) {
    request.post(`/api/reminders/delete/${id}`, { method: 'DELETE' })
      .then(() => {
        reminder.parentElement.removeChild(reminder);
      });
  }

  if (hasClass(el, 'edit-reminder')) {
    editingUI.showEditingUI(id);
    hideContextMenus();

    e.stopPropagation();
    return false;
  }

  if (hasClass(el, 'update-reminder')) {
    const updatedReminder = getReminder(reminder, { isEditingUI: true });
    editingUI.updateReminder(id, updatedReminder);
  }

  if (hasClass(el, 'cancel-editing')) {
    editingUI.hideEditingUI(id);
  }

  if (hasClass(el, 'context-menu-button')) {
    hideContextMenus();

    const menu = el.parentElement.querySelector('.menu');
    menu.classList.toggle('show');
    e.stopPropagation();
    return false;
  }
});

document.body.addEventListener('click', () => {
  hideContextMenus();
});
