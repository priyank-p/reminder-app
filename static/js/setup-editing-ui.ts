import $ from './dom';

const reminders = $('.reminder', 'nodelist') as Element[];
function setupDateEditing() {
  reminders.forEach(reminder => {
    const dueDate = reminder.querySelector('.due-date');
    const editElement = document.createElement('input');
    editElement.classList.add('edit');
    editElement.classList.add('edit-due-date');
    editElement.setAttribute('name', 'due_date');
    editElement.setAttribute('placeholder', 'Due Date');
    editElement.setAttribute('value', dueDate.textContent.trim());
    reminder.appendChild(editElement);

    const errorTooltip = document.createElement('div');
    errorTooltip.classList.add('error-tooltip');
    errorTooltip.textContent = 'Due Date is not valid!';
    reminder.appendChild(errorTooltip);
  });
}

function setupEditTextarea() {
  reminders.forEach(reminder => {
    const $content = reminder.querySelector('.content') as HTMLElement;
    const $textarea = reminder.querySelector('textarea');
    $textarea.value = $content.innerText;
  });
}

export default function setup() {
  requestAnimationFrame(() => {
    setupDateEditing();
    setupEditTextarea();
  });
}
