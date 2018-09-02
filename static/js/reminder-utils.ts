import $ from './dom';

export const reminderModal = $('#add-reminder-modal') as Element;
export const addReminderBtn = $('#add-reminder-btn') as Element;
export function toogleReminderModal() {
  reminderModal.classList.toggle('open');
}

export interface Reminder {
  title: string,
  reminder: string,
  due_time: any,
  due_date: string | Date | null,
  created_at: string | Date | null,
  notified: boolean,
  id: number
}

interface getReminderOpts {
  isEditingUI: boolean;
  dueDate?: null | Date;
}

export function getReminder(el: any, opts: getReminderOpts): Reminder {
  const reminder: any = {};
  const selector: string = opts.isEditingUI ? '.edit' : 'input, textarea';
  const elements = el.querySelectorAll(selector);

  elements.forEach(input => {
    reminder[input.name] = input.value;
  });

  // don't tranform date to json/iso/utc it does work the same in
  // backend, meaning the date is changed in backend.
  if (opts.dueDate) {
    reminder.due_date = opts.dueDate.toUTCString();
  }

  return reminder;
}
