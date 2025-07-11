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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Add global before hook
beforeEach(() => {
  // Set viewport
  cy.viewport(1280, 720);
  
  // Clear cookies and local storage
  cy.clearCookies();
  cy.clearLocalStorage();
});

// Add global after hook
afterEach(() => {
  // Clean up after each test
  cy.clearCookies();
  cy.clearLocalStorage();
});

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // Return false to prevent the unhandled exception from failing the test
  return false;
});

// Custom commands for OrangeHRM automation

Cypress.Commands.add('loginAsAdmin', () => {
    cy.fixture('users').then((users) => {
      cy.visit('/web/index.php/auth/login');
      cy.get('[name="username"]').type(users.validUser.username);
      cy.get('[name="password"]').type(users.validUser.password);
      cy.get('[type="submit"]').click();
      cy.url().should('include', '/dashboard/index');
    });
  });
  
  Cypress.Commands.add('navigateToAdmin', () => {
    cy.get('.oxd-main-menu-item').contains('Admin').click();
    cy.url().should('include', '/admin/viewSystemUsers');
  });
  
  Cypress.Commands.add('waitForPageLoad', () => {
    cy.get('.oxd-layout').should('be.visible');
  });
  
  Cypress.Commands.add('clearAndType', { prevSubject: 'element' }, (subject, text) => {
    cy.wrap(subject).clear().type(text);
  });