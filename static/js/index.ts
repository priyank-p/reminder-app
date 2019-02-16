import formatDate from './format-due-date';
import setupDateEditing from './edit-due-date';
import register from './register';
import * as menu from './menu';
import { apiEvents } from './api-events';

formatDate();
setupDateEditing();
register();

menu.on('archive', () => {
  location.href = '/archives';
});
