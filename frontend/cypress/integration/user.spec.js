describe('user page', () => {
  it('sets document title to "Mansa - user"', () => {
    cy.visit('/user');
    cy.title().should('eq', 'Mansa - user');
  });
});
