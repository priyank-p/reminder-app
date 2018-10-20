import $ from './dom';
import * as request from './request';

function restoreReminder(id, els) {
  const { $menuContainer, $menus,
          reminder, $restoreMenu } = els;
  request.get(`/api/archives/restore/${id}`)
    .then(() => {
      $menuContainer.removeChild($restoreMenu);
      $menus.forEach(el => el.classList.remove('disabled'));
      reminder.classList.remove('deleted-by-sw');

      // remove (deleted) text
      const title = reminder.querySelector('.title');
      const regex = /^\(deleted\) /;
      title.innerHTML = title.innerHTML.replace(regex, '');
      reminder.title = reminder.title.replace(regex, '');
    });
}

function changeContextMenu(reminder: HTMLElement, archiveId: number) {
  const $menuContainer = reminder.querySelector('.menu');
  const $menus: Element[]= Array.from($menuContainer.querySelectorAll('div'));
  $menus.forEach($el => {
    $el.classList.add('disabled');
  });

  const $restoreMenu = document.createElement('div');
  $restoreMenu.classList.add('restore-reminder');
  $restoreMenu.textContent = 'Restore Reminder';
  $menuContainer.appendChild($restoreMenu);

  $restoreMenu.addEventListener('click', (evt) => {
    evt.stopPropagation();
    restoreReminder(archiveId, {
      $menuContainer, $menus, $restoreMenu, reminder
    });
  });
}

function reminderDeleted(id: number, archiveId: number) {
  const selector = `.reminder[data-id="${id}"]`;
  const reminder = $(selector) as HTMLElement;
  reminder.classList.add('deleted-by-sw');

  const title = reminder.querySelector('.title');
  title.innerHTML = '(deleted) ' + title.innerHTML;
  reminder.title = '(deleted) ' + reminder.title;

  changeContextMenu(reminder, archiveId);
}

export default function SWManager(event) {
  switch (event.data.message) {
    case 'reminder-deleted':
      reminderDeleted(event.data.id, event.data.archiveId);
      break;
  }
}
