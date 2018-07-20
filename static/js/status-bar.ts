import $ from './dom';

const statusbar = $('.status-bar') as HTMLElement;
export function show(message: string) {
  statusbar.innerText = message;
  statusbar.classList.add('show');

  setTimeout(() => {
    statusbar.innerText = '';
    statusbar.classList.remove('show');
  }, 1500);
}
