import formatDate from './format-due-date';
import setupDateEditing from './edit-due-date';
import register from './register';
import * as menu from './menu';
import { apiEvents } from './api-events';
import $ from './dom';

formatDate();
setupDateEditing();
register();

apiEvents.on('reminder-deleted', (id: number) => {
  const $reminder: HTMLElement = $(`.reminder[data-id="${id}"]`) as HTMLElement;
  if ($reminder) {
    $reminder.parentElement.removeChild($reminder);
  }
});

menu.on('archive', () => {
  location.href = '/archives';
});
