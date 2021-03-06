import $ from './dom';

const menubar = $('.menu-bar' ) as Element;
const menuholder = $('.menu-holder') as Element;
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

interface MenuHandler {
  name: string;
  handler: Function;
}

export const menuHandlers: MenuHandler[] = [];
export function on(name: string, handler: Function) {
  menuHandlers.push({name, handler})
}

sidebar.addEventListener('click', (e: MouseEvent) => {
  const el: HTMLElement = e.target as HTMLElement;
  const name: string = el.dataset.menu;

  e.stopPropagation();
  menuHandlers.forEach(data => {
    if (data.name === name) {
      data.handler();

      menubar.classList.remove('show');
    }
  });
});

menuholder.addEventListener('click', (e: MouseEvent) => {
  menubar.classList.remove('show');
  e.stopPropagation();
});
