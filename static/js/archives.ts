import * as request from './request';

function restore(id: string) {
  request.get(`/api/archives/restore/${id}`)
    .then(() => {
      location.href = '/';
    });
}
