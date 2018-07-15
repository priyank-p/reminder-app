import * as PushNotifications from './push-notifications';
import SWManager from './sw-manager';
import formatDate from './format-due-date';

declare const swPath;
formatDate();

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
