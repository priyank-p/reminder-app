import * as request from './request';
import { init as initContextMenus } from './context-menu';
import $ from './dom';

initContextMenus();
function restore(id: string) {
  request.get(`/api/archives/restore/${id}`)
    .then(() => {
      location.href = '/';
    });
}

const archives = $('.archives') as Element;
archives.addEventListener('click', (event: MouseEvent) => {
  const el: Element = event.target as Element;
  const archive: HTMLElement = el.parentElement.parentElement.parentElement;
  const id = archive.dataset.id;

  if (el.classList.contains('restore')) {
    restore(id);
  }
});
