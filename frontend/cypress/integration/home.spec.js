// home.spec.js created with Cypress

describe('home page', () => {
  it('redirect to /user', () => {
    cy.visit('/');
    cy.url().should('match', /\/user$/);
  });
});
