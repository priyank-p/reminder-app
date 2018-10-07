// handles asking for the install to homescreen
// prompt must be called with user prompt.
import $ from './dom';

const localStorageKey = 'do-not-ask-for-app-install-banner';
const doNotAsk = localStorage.getItem(localStorageKey) !== null;

window.addEventListener('beforeinstallprompt', (evt: any) => {
  evt.preventDefault();
  if (doNotAsk) {
    return;
  }

  const $banner = $('#install-app-banner') as Element;
  $banner.classList.add('show');
  $banner.addEventListener('click', (event) => {
    const target = event.target as Element;
    if (target.classList.contains('install')) {
      $banner.classList.remove('show');
      evt.prompt();
    }

    if (target.classList.contains('do-not-ask')) {
      $banner.classList.remove('show');
      localStorage.setItem(localStorageKey, 'yes');
    }

    if (target.classList.contains('close')) {
      $banner.classList.remove('show');
    }
  });
});
