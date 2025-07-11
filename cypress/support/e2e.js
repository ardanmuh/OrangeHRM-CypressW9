// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

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