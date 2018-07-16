import $ from './dom';
import * as request from './request';

function getEditElements(id: number): Element[][] {
  const selector: string = `.reminder[data-id="${id}"]`;
  const reminder = $(selector) as Element;

  const editElements: Element[] = Array.from(reminder.querySelectorAll('.edit,.edit-ui'));
  const reminderElements: Element[] = [
    reminder.querySelector('.title'),
    reminder.querySelector('.content'),
    reminder.querySelector('.context-menu')
  ];

  return [ editElements, reminderElements ];
}

export function showEditingUI(reminderId: number) {
  const [ editElements, reminderElements ] = getEditElements(reminderId);
  editElements.forEach(el => el.classList.add('show'));
  reminderElements.forEach(el => el.classList.add('hide'));
}

export function hideEditingUI(reminderId: number) {
  const [ editElements, reminderElements ] = getEditElements(reminderId);
  editElements.forEach(el => el.classList.remove('show'));
  reminderElements.forEach(el => el.classList.remove('hide'));
}

// TODO: create a Reminder Interface!
function updateReminderElement(id: number, reminder: any) {
  const reminderElement = $(`.reminder[data-id="${id}"]`) as HTMLElement;
  const title = reminderElement.querySelector('.title') as HTMLElement;
  const content = reminderElement.querySelector('.content') as HTMLElement;

  title.innerText = reminder.title;
  content.innerText = reminder.reminder;
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

export function updateReminder(id: number, updatedReminder: any) {
  const route = `/api/reminders/update/${id}`;
  const data: object = {
    body: updatedReminder
  };

  request.post(route, data)
    .then(() => {
      removeErrorUI(id);
      updateReminderElement(id, updatedReminder);
    })
    .catch(() => {
      showErrorUI(id);
    });
}
