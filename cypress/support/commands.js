// #region custom function - cType
Cypress.Commands.add('cType', (selector, value, options) => {
  cy.get(selector).clear().then(() => {
    cy.get(selector).type(value, options);
  });
});
// #endregions

// #region custom function - cClick
Cypress.Commands.add('cClick', (selector, options) => {
  cy.get(selector).click(options);
});
// #endregion
