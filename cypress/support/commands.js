// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('openReminderModal', () => {
  cy.get('#add-reminder-btn').click();
});

Cypress.Commands.add('deleteLastReminder', () => {
  const lastAdded = cy.get('.reminders .reminder:last-child');
  lastAdded.within(() => {
    cy.get('.context-menu-button').click();
    cy.get('.menu .delete-reminder').click();
  });
});

Cypress.Commands.add('deleteReminder', { prevSubject: 'element' }, (el) => {
  el.find('.context-menu-btn').click();
  el.find('.menu .delete-reminder').click();
});
