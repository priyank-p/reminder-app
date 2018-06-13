import * as PushNotifications from './push-notifications';
import dateFormat from 'dateformat';
import $ from './dom';

$('.reminder', 'nodelist').forEach((el) => {
  const due_date = el.querySelector('.due-date');
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

      // we register for push as soon as possible currently
      // TODO: Set up a ui for this, this is a bad UX.
      const isRegistered = await PushNotifications.isRegistered();
      if (!isRegistered) {
        PushNotifications.register();
      }
    }

    register()
      .catch(err => {
        console.error('Error during registering sw process: ', err);
      });
  });
}
