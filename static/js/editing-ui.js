import { $ } from './dom';

function getEditElements(id) {
  const selector = `.reminder[data-id="${id}"]`;
  const reminder = $(selector);

  const editElements = reminder.querySelectorAll('.edit');
  return editElements;
}

export function showEditingUI(reminderId) {
  const editElements = getEditElements(reminderId);
  editElements.forEach(el => el.classList.add('show'));
}

export function hideEditingUI(reminderId) {
  const editElements = getEditElements(reminderId);
  editElements.forEach(el => el.classList.remove('show'));
}
