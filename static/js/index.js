import * as PushNotifications from './push-notifications';
import dateFormat from 'dateformat';
import $ from './dom';

$('.reminder', 'nodelist').forEach((el) => {
  const due_date = el.querySelector('.due-date');

  if (due_date.innerText === '') {
    return;
  }

  const date = new Date(due_date.innerText);
  let formattedDate = dateFormat(date, 'shortDate') + ' ';
  formattedDate += dateFormat(date, 'shortTime');
  due_date.innerText = formattedDate;
});

$('.reminders').classList.remove('hide');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    async function register() {
      const reg = await navigator.serviceWorker.register(swPath, {
        scope: '/'
      });

      PushNotifications.setSWReg(reg);

      const isRegistered = await PushNotifications.isRegistered();
      if (!isRegistered) {
        PushNotifications.showRegisterUI();
      }
    }

    register()
      .catch(err => {
        console.error('Error during registering sw process: ', err);
      });
  });
}
