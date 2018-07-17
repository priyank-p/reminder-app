import $ from './dom';

export const reminderModal = $('#add-reminder-modal') as Element;
export const addReminderBtn = $('#add-reminder-btn') as Element;
export function toogleReminderModal() {
  reminderModal.classList.toggle('open');
}

interface Reminder {
  title: string,
  reminder: string,
  due_time: any,
  due_date: string | Date | null,
  created_at: string | Date | null,
  notified: boolean,
  id: number
}

export function getReminder(el: any, { isEditingUI }): Reminder {
  const reminder: any = {};
  const selector: string = isEditingUI ? '.edit' : 'input, textarea';
  const elements = el.querySelectorAll(selector);

  elements.forEach(input => {
    reminder[input.name] = input.value;
  });

  if (reminder.due_date) {
    reminder.due_date = new Date(reminder.due_date.replace(/-/g, '/'));
  }

  if (reminder.due_time) {
    const [ hour, minutes ] = reminder.due_time.split(':').map(_ => parseInt(_));
    const dueDate = reminder.due_date;

    dueDate.setHours(hour, minutes, 0);
    reminder.due_date = dueDate;
  }

  // don't tranform date to json/iso/utc it does work the same in
  // backend, meaning the date is changed in backend.
  if (reminder.due_date) {
    reminder.due_date = reminder.due_date.toUTCString();
  }

  delete reminder.due_time;
  return reminder;
}
