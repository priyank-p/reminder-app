import $ from './dom';

function reminderDeleted(id) {
  const selector = `.reminder[data-id="${id}"]`;
  const reminder = $(selector);
  reminder.classList.add('deleted-by-sw');
}

export default function SWManager(event) {
  switch (event.data.message) {
  case 'reminder-deleted':
    reminderDeleted(event.data.id);
    break;
  }
}
