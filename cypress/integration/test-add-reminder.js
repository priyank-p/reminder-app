describe('test-add-reminder', () => {
  it('Test adding reminder without due date', () => {
    cy.visit('/');
    cy.get('#add-reminder-btn').click();

    const form = cy.get('#add-reminder-modal form');
    form.should('be.visible');
    form.within(() => {
      cy.get('#reminder-title').type('Reminder Title');
      cy.get('#reminder-textarea').type('Reminder Content');
      cy.get('button[type=submit]').click();
    });

    const lastAdded = cy.get('.reminders .reminder:last-child');
    lastAdded.within(() => {
      cy.get('.title').should('contain', 'Reminder Title');
      cy.get('.content').should('contain', 'Reminder Content');
      cy.get('.due-date').should('contain', '');
      cy.get('.context-menu-button').click();
      cy.get('.menu .delete-reminder').click();
    });
  });
});
