import formatDate from './format-due-date';
import register from './register';
import * as menu from './menu';

formatDate();
register();

menu.on('archive', () => {
  location.href = '/archives';
});
