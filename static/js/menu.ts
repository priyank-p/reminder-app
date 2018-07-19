import $ from './dom';

const menubar = $('.menu-bar' ) as Element;
const sidebar = $('.menu-sidebar') as Element;
const closeMenuButton = $('.menu-sidebar .close') as Element;

menubar.addEventListener('click', (e: MouseEvent) => {
  menubar.classList.add('show');
});

closeMenuButton.addEventListener('click', (e: MouseEvent) => {
  menubar.classList.remove('show');
  e.stopPropagation();
  return false;
});

type MenuHandlers = [string, Function];
export const menuHandlers: MenuHandlers[] = [];
export function on(name: string, handler: Function) {
  menuHandlers.push([name, handler])
}

sidebar.addEventListener('click', (e: MouseEvent) => {
  const el: HTMLElement = e.target as HTMLElement;
  const name: string = el.dataset.menu;

  menuHandlers.forEach(data => {
    if (data[0] === name) {
      data[1]();
      e.stopPropagation();
    }
  });
});


