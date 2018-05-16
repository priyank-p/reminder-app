const { $ } = require('./dom');

const dueDateInput = $('#add-reminder-modal form input[type=date]');
const date = new Date();
const tommorow = new Date(date.getTime() + 86400000);
const month = tommorow.getMonth() + 1;
const nextDate = tommorow.getDate() + 1;
let inputValue = `${tommorow.getFullYear()}-`;
inputValue += month < 10 ? '0' + month : month;
inputValue += '-';
inputValue += nextDate < 10 ? '0' + nextDate : nextDate;
dueDateInput.value = inputValue;

const dropdowns = $('.dropdown', 'nodelist');

// require event handlers
require('./app-hotkeys');
require('./event-listeners');
