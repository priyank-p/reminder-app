import $ from './dom';

function getEditElements(id) {
  const selector = `.reminder[data-id="${id}"]`;
  const reminder = $(selector);

  const editElements = reminder.querySelectorAll('.edit');
  const reminderElements = [
    reminder.querySelector('.title'),
    reminder.querySelector('.content')
  ];

  return [ editElements, reminderElements ];
}

export function showEditingUI(reminderId) {
  const [ editElements, reminderElements ] = getEditElements(reminderId);
  editElements.forEach(el => el.classList.add('show'));
  reminderElements.forEach(el => el.classList.add('hide'));
}

export function hideEditingUI(reminderId) {
  const [ editElements, reminderElements ] = getEditElements(reminderId);
  editElements.forEach(el => el.classList.remove('show'));
  reminderElements.forEach(el => el.classList.remove('hide'));
}
