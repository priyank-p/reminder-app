import * as request from './request';
import { init as initContextMenus } from './context-menu';
import formatDate from './format-due-date';
import $ from './dom';
import * as statusbar from './status-bar';

formatDate();
initContextMenus();

function restore(id: string) {
  request.get(`/api/archives/restore/${id}`)
    .then(() => {
      location.href = '/';
    });
}

function deleteArchive(id: string): Promise<Response> {
  return request.post(`/api/archives/delete/${id}`, {
    method: 'DELETE'
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

  if (el.classList.contains('delete')) {
    deleteArchive(id)
      .then(() => {
        statusbar.show('Archive deleted');
        archive.parentElement.removeChild(archive);
      })
      .catch(() => {
        statusbar.show('Failed to delete archive');
      });
  }
});

const backButton = $('.back-button') as Node;
backButton.addEventListener('click', () => {
  location.href = '/';
});
