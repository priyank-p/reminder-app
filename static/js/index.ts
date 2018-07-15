import * as PushNotifications from './push-notifications';
import SWManager from './sw-manager';
import dateFormat from 'dateformat';
import $ from './dom';

declare const swPath;

($('.reminder', 'nodelist') as Node[]).forEach((el: Element) => {
  const due_date: HTMLElement = el.querySelector('.due-date');

  if (due_date.innerText === '') {
    return;
  }

  const date = new Date(due_date.innerText);
  let formattedDate: string = dateFormat(date, 'shortDate') + ' ';
  formattedDate += dateFormat(date, 'shortTime');
  due_date.innerText = formattedDate;
});

($('.reminders') as Element).classList.remove('hide');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    async function register() {
      const reg: ServiceWorkerRegistration = await navigator.serviceWorker.register(swPath, {
        scope: '/'
      });

      PushNotifications.setSWReg(reg);

      const isRegistered: boolean = await PushNotifications.isRegistered();
      if (!isRegistered) {
        PushNotifications.showRegisterUI();
      }

      navigator.serviceWorker.addEventListener('message', SWManager);
    }

    register()
      .catch(err => {
        console.error('Error during registering sw process: ', err);
      });
  });
}
