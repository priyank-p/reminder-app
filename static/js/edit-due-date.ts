import $ from './dom';

function setup() {
  const dueDates = $('.reminder .due-date', 'nodelist') as Node[];
  dueDates.forEach(el => {
    const reminder: HTMLElement = el.parentElement;
    const editElement = document.createElement('input');
    editElement.classList.add('edit');
    editElement.classList.add('edit-due-date');
    editElement.setAttribute('name', 'due_date');
    editElement.setAttribute('placeholder', 'Due Date');
    editElement.setAttribute('value', el.textContent.trim());
    reminder.appendChild(editElement);
  });
}

export default function setupDateEditing() {
  requestAnimationFrame(setup);
}
