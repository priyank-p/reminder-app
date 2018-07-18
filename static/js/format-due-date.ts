import * as dateFormat from 'dateformat';
import $ from './dom';

export default function formatDate() {
  ($('.reminder, .archive', 'nodelist') as Node[]).forEach((el: Element) => {
    const due_date: HTMLElement = el.querySelector('.due-date');

    if (due_date.innerText === '') {
      return;
    }

    const date = new Date(due_date.innerText);
    let formattedDate: string = dateFormat(date, 'shortDate') + ' ';
    formattedDate += dateFormat(date, 'shortTime');
    due_date.innerText = formattedDate;
  });

  ($('.reminders, .archives') as Element).classList.remove('hide');
}