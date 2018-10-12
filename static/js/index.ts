import formatDate from './format-due-date';
import setupDateEditing from './edit-due-date';
import register from './register';
import * as menu from './menu';

formatDate();
setupDateEditing();
register();

menu.on('archive', () => {
  location.href = '/archives';
});
