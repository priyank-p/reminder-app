import $ from './dom';
import { Reminder as ReminderInterface } from './reminder-utils';
import * as dateFormat from 'dateformat';
import * as statusbar from './status-bar';
import * as request from './request';

type GetEditElementsReturnType = [ Element[], Element[], Element ];
function getEditElements(id: number): GetEditElementsReturnType {
  const selector: string = `.reminder[data-id="${id}"]`;
  const reminder = $(selector) as Element;

  const editElements: Element[] = Array.from(reminder.querySelectorAll('.edit,.edit-ui'));
  const reminderElements: Element[] = [
    reminder.querySelector('.title'),
    reminder.querySelector('.content'),
    reminder.querySelector('.context-menu'),
    reminder.querySelector('.due-date')
  ];

  return [ editElements, reminderElements, reminder ];
}

function handleDateInput(reminder: Element, editDueDate: any) {
  const rawDate = editDueDate.value;
  if (rawDate === '') {
    return;
  }

  // a valid date check also includes checking is
  // it is a number since new Date(3) or 23812981293 is valid
  // but not something a user will expect; and is incorrect behavior
  const date = new Date(rawDate);
  const isInvalid = isNaN(date.getDate()) || /^\d+$/.test(rawDate);

  const updateReminder = reminder.querySelector('.update-reminder');
  const tooltip = reminder.querySelector('.error-tooltip');
  if (isInvalid) {
    updateReminder.setAttribute('disabled', 'true');
    editDueDate.classList.add('error');
    tooltip.classList.add('show');
  } else {
    updateReminder.removeAttribute('disabled');
    editDueDate.classList.remove('error');
    tooltip.classList.remove('show');
  }
}

export function showEditingUI(reminderId: number) {
  const [
    editElements, reminderElements, reminder
  ] = getEditElements(reminderId);

  editElements.forEach(el => el.classList.add('show'));
  reminderElements.forEach(el => el.classList.add('hide'));

  const editDueDate = reminder.querySelector('.edit-due-date');
  editDueDate.addEventListener('input', () => {
    handleDateInput(reminder, editDueDate);
  });
}

export function hideEditingUI(reminderId: number) {
  const [ editElements, reminderElements ] = getEditElements(reminderId);
  editElements.forEach(el => el.classList.remove('show'));
  reminderElements.forEach(el => el.classList.remove('hide'));
}

function updateReminderElement(id: number, reminder: ReminderInterface) {
  const reminderElement = $(`.reminder[data-id="${id}"]`) as HTMLElement;
  const title = reminderElement.querySelector('.title') as HTMLElement;
  const content = reminderElement.querySelector('.content') as HTMLElement;
  const dueDate = reminderElement.querySelector('.due-date') as HTMLElement;

  const date = new Date(reminder.due_date);
  let formattedDate = '';
  if (!isNaN(date.getTime())) {
    formattedDate = dateFormat(date, 'shortDate') + ' ';
    formattedDate += dateFormat(date, 'shortTime');
  }

  title.innerText = reminder.title;
  content.innerText = reminder.reminder;
  dueDate.innerText = formattedDate;
  hideEditingUI(id);
}

function showErrorUI(id: number) {
  const [ editElements ] = getEditElements(id);
  editElements.forEach(el => el.classList.add('error'));
}

function removeErrorUI(id: number) {
  const [ editElements ] = getEditElements(id);
  editElements.forEach(el => el.classList.remove('error'));
}

export function updateReminder(id: number, updatedReminder: ReminderInterface) {
  const route = `/api/reminders/update/${id}`;
  const data: object = {
    body: updatedReminder
  };

  request.post(route, data)
    .then(() => {
      statusbar.show('Reminder updated');
      removeErrorUI(id);
      updateReminderElement(id, updatedReminder);
    })
    .catch((e) => {
      statusbar.show('Failed to updated reminder!');
      showErrorUI(id);
    });
}
