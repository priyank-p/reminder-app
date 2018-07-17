// auto resize the textarea, also used
// to auto resized edit-ui.
export function resize(el: HTMLElement) {
  el.style.height = 'auto';
  el.style.height = (el.scrollHeight) + 'px';
}

export function init() {
  document.body.addEventListener('input', (e: Event) => {
    const el = e.target as Element;
    const isTextarea = /textarea/i;
    const isAddReminderTextarea = el.id === 'reminder-textarea';
    if (isTextarea.test(el.tagName) && !isAddReminderTextarea) {
      resize(e.target as HTMLElement);
    }
  });
}
