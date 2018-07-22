import $ from './dom';
import * as request from './request';
import * as editingUI from './editing-ui';
import * as dateFormat from 'dateformat';
import * as ReminderUtils from './reminder-utils';
import * as statusbar from './status-bar';
import { init as initContextMenus, hideContextMenus } from './context-menu';
import { init as initTextareaAutoResize } from './textarea-autoresize';

const {
  addReminderBtn, toogleReminderModal,
  reminderModal, getReminder
} = ReminderUtils;

addReminderBtn.addEventListener('click', toogleReminderModal);
reminderModal.addEventListener('click', (e) => {
  // if the modal was clicked and not the form
  if (e.target === e.currentTarget) {
    toogleReminderModal();
  }
});

const closeModal = $('#add-reminder-modal .close-modal') as Element;
closeModal.addEventListener('click', toogleReminderModal);

function toggleDropdown(e: Event) {
  const el: Element = e.target as Element;
  el.classList.toggle('show');
}

const dropdowns = $('.dropdown-section .title', 'nodelist') as Node[];
dropdowns.forEach((dropdown: Element) => {
  dropdown.addEventListener('click', toggleDropdown);
});

const reminderForm = $('#add-reminder-modal form') as Element;
reminderForm.addEventListener('submit', function (e: Event) {
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
const inputBaseSelector: string = '#add-reminder-modal form';
const dueDateInput = $(`${inputBaseSelector} input[type="date"]`) as HTMLInputElement;
const dueTimeInput = $(`${inputBaseSelector} input[type="time"]`) as HTMLInputElement;
function setDueDate(n: number) {
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
  const date: Date = new Date();
  for (let i = 0; i < n; i++) {
    date.setDate(date.getDate() + 1);
  }

  // TODO: Add protip section with the tip
  // entering 0 in the quick-choose UI.
  if (n === 0) {
    date.setDate(Date.now());
  }

  // the value muse be in standard yyyy-mm-dd format
  dueDateInput.value = dateFormat(date, 'yyyy-mm-dd');
  if (dueTimeInput.value === '') {
    dueTimeInput.value = '12:00';
  }
}

const quickDueDatePicker = $('.quick-choose input') as Element;
quickDueDatePicker.addEventListener('input', (e) => {
  const el = e.target as HTMLInputElement;
  // the el.value is alreay a number due to it
  // being type=number but typescript or just by reading
  // the code on can't understand this!
  setDueDate(Number(el.value));
});

function hasClass(el: Element, _class: string): Boolean {
  return el.classList.contains(_class);
}

// init context-menus and textare auto-resize
initContextMenus();
initTextareaAutoResize();

const reminders = $('.reminders') as Element;
reminders.addEventListener('click', (e: Event) => {
  const el: Element  = e.target as Element;
  const reminder: Element = el.parentElement.parentElement.parentElement;
  const id: number = +reminder.getAttribute('data-id');

  if (hasClass(el, 'delete-reminder')) {
    request.post(`/api/reminders/delete/${id}`, { method: 'DELETE' })
      .then(() => {
        statusbar.show('Reminder Deleted');
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
});
