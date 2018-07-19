import $ from './dom';

const menubar: Element = $('.menu-bar' ) as Element;
const sidebar: Element = $('.menu-sidebar') as Element;
const closeMenuButton: Element = $('.menu-sidebar .close') as Element;

console.log(closeMenuButton);
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


