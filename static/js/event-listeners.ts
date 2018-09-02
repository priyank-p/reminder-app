import SimplePicker = require('simplepicker');
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

const simplepicker = new SimplePicker({
  zIndex: 6
});

const $simplepickerButton = $('#add-reminder-modal .simplepicker-button') as Element;
const $dueDateEl = $simplepickerButton.nextElementSibling as HTMLElement;
$simplepickerButton.addEventListener('click', () => {
  simplepicker.open();
  $simplepickerButton.innerHTML = 'Choose due date';
  $dueDateEl.style.display = 'block';
});

let dueDate: null | Date;
simplepicker.on('submit', (date, readableDate) => {
  dueDate = date;
  $dueDateEl.textContent = readableDate;
});

simplepicker.on('close', () => {
  dueDate = null;
  $dueDateEl.textContent = 'No Date Selected!';
});

const reminderForm = $('#add-reminder-modal form') as Element;
reminderForm.addEventListener('submit', function (e: Event) {
  const reminder = getReminder(e.target, { isEditingUI: false, dueDate });
  request.post('/api/reminders/add', { body: reminder })
    .then(() => {
      window.location.reload();
    });
  toogleReminderModal();
  e.preventDefault();
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
