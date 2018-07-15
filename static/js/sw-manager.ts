import $ from './dom';

function reminderDeleted(id: number) {
  const selector = `.reminder[data-id="${id}"]`;
  const reminder = $(selector) as HTMLElement;
  reminder.classList.add('deleted-by-sw');
  reminder.title = '(deleted) ' + reminder.title;
}

export default function SWManager(event: MessageEvent) {
  switch (event.data.message) {
  case 'reminder-deleted':
    reminderDeleted(event.data.id);
    break;
  }
}
