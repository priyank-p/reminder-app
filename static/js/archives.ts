import * as request from './request';
import { init as initContextMenus } from './context-menu';

initContextMenus();
function restore(id: string) {
  request.get(`/api/archives/restore/${id}`)
    .then(() => {
      location.href = '/';
    });
}
