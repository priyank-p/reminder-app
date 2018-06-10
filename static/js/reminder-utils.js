export function getReminder(el, { isEditingUI }) {
  const reminder = {};
  const selector = isEditingUI ? '.edit' : 'input, textarea';
  const elements = el.querySelectorAll(selector);

  elements.forEach(input => {
    reminder[input.name] = input.value;
  });

  if (reminder.due_date) {
    const time = reminder.due_time ? 'T' + reminder.due_time : '';
    reminder.due_date = new Date(reminder.due_date + time);
  }

  delete reminder.due_time;
  return reminder;
}

window.getReminder = getReminder;
