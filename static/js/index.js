import * as PushNotifications from './push-notifications';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    async function register() {
      const reg = await navigator.serviceWorker.register(swPath, {
        scope: '/'
      });

      PushNotifications.setSWReg(reg);

      // we register for push as soon as possible currently
      // TODO: Set up a ui for this, this is a bad UX.
      await PushNotifications.register();
    }

    register()
      .catch(err => {
        console.error('Error during registering sw process: ', err);
      });
  });
}
