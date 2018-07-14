import * as request from './request';
import $ from './dom';

declare const publicKey;

export let swReg: ServiceWorkerRegistration;
export const localStorageKey: string = 'push-subscribed';
export function setSWReg(reg: ServiceWorkerRegistration) {
  swReg = reg;
}

export async function isPushRegistered(): Promise<boolean> {
  const { pushManager } = swReg;
  const subscription = pushManager.getSubscription();
  return (subscription !== null);
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding: string = '='.repeat((4 - base64String.length % 4) % 4);
  const base64: string = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData: string = window.atob(base64);
  const outputArray: Uint8Array = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function isRegistered(): Promise<boolean> {
  const subscription  = await swReg.pushManager.getSubscription();
  const subscriptionNotSent: boolean = (localStorage.getItem(localStorageKey) === null);

  // user does not want push notifications.
  const userDenied: boolean = localStorage.getItem('do-not-ask-for-push') !== null;
  if (userDenied) {
    return true;
  }

  if (subscription === null || subscriptionNotSent) {
    return false;
  }

  return true;
}

async function register(): Promise<void> {
  const subscription: PushSubscription = await swReg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey)
  });

  request.post('/subscribe', { body: subscription })
    .then(() => {
      localStorage.setItem(localStorageKey, 'yes');
    });
}

const ui = $('#ask-for-push');
function closeUI() {
  ui.classList.remove('show');
}

ui.addEventListener('click', (e) => {
  const el = e.target;
  if (el.classList.contains('enable-push')) {
    register()
      .then(closeUI)
      .catch(closeUI);
  }

  if (el.classList.contains('close-modal')) {
    closeUI();
  }

  if (el.classList.contains('do-not-ask')) {
    localStorage.setItem('do-not-ask-for-push', 'yes');
    closeUI();
  }
});

export function showRegisterUI() {
  ui.classList.add('show');
}
