import $ from './dom';

export function hideContextMenus() {
  const menus = $('.menu.show', 'nodelist') as Element[];
  menus.forEach(el => {
    el.classList.remove('show');
  });
}

export function init() {
  document.body.addEventListener('click', (e: MouseEvent) => {
    const el = e.target as Element;

    // hide all the open context-menu's first.
    hideContextMenus();
    if (el.classList.contains('context-menu-button')) {
      const menu = el.nextElementSibling;
      menu.classList.toggle('show');
    }
  });
}
