import * as PushNotifications from './push-notifications';
import SWManager from './sw-manager';

declare const swPath;
export default function register() {
  if (!('serviceWorker' in navigator)) {
    return;
  }

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
