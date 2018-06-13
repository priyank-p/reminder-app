export function getReminder(el, { isEditingUI }) {
  const reminder = {};
  const selector = isEditingUI ? '.edit' : 'input, textarea';
  const elements = el.querySelectorAll(selector);

  elements.forEach(input => {
    reminder[input.name] = input.value;
  });

  reminder.due_date = new Date(reminder.due_date.replace(/-/g, '/'));
  if (reminder.due_time) {
    const [ hour, minutes ] = reminder.due_time.split(':').map(_ => parseInt(_));
    const dueDate = reminder.due_date;

    dueDate.setHours(hour, minutes, 0);
    reminder.due_date = dueDate;
  }

  // don't tranform date to json/iso/utc it does work the same in
  // backend, meaning the date is changed in backend.
  reminder.due_date = reminder.due_date.toUTCString();
  delete reminder.due_time;
  return reminder;
}
