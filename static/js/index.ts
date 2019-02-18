import formatDate from './format-due-date';
import setupDateEditing from './edit-due-date';
import register from './register';
import * as menu from './menu';
import APIEvents from './api-events';
import $ from './dom';
import { updateReminderElement } from './editing-ui';
import { Reminder } from './reminder-utils';

formatDate();
setupDateEditing();
register();

const apiEvents = new APIEvents();
apiEvents.on('reminder-deleted', (id: number) => {
  const $reminder: HTMLElement = $(`.reminder[data-id="${id}"]`) as HTMLElement;
  if ($reminder) {
    $reminder.parentElement.removeChild($reminder);
  }
});

apiEvents.on('reminder-updated', (updatedReminder) => {
  updateReminderElement(updatedReminder.id, updatedReminder as Reminder);
});

menu.on('archive', () => {
  location.href = '/archives';
});
