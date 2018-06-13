import * as request from './request';

export let swReg;
export const localStorageKey = 'push-subscribed';
export function setSWReg(reg) {
  swReg = reg;
}

export async function isPushRegistered() {
  const { pushManager } = swReg;
  const subscription = pushManager.getSubscription();
  return (subscription !== null);
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function isRegistered() {
  const subscription = await swReg.pushManager.getSubscription();
  const subscriptionNotSent = (localStorage.getItem(localStorageKey) === null);
  if (subscription === null || subscriptionNotSent) {
    return false;
  }

  return true;
}

export async function register() {
  const subscription = await swReg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey)
  });

  request.post('/subscribe', { body: subscription })
    .then(() => {
      localStorage.setItem(localStorageKey, 'yes');
    });
}
