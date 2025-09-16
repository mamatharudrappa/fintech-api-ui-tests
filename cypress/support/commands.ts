/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//
declare global {
  namespace Cypress {
    interface Chainable {
        registerUser(name: string, email: string, accountType: string): Chainable<void>;
        createTransaction(userId: string, amount: number, type: string, recipientId: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add("registerUser", (name, email, accountType) => {
    cy.visit("/register");
    cy.get("#name").type(name);
    cy.get("#email").type(email);
    cy.get("#accountType").select(accountType);
    cy.get("button[type=submit]").click();
});

Cypress.Commands.add("createTransaction", (userId, amount, type, recipientId) => {
  cy.visit("/transactions/new");
  cy.get("#userId").type(userId);
  cy.get("#amount").type(amount.toString());
  cy.get("#type").select(type);
  cy.get("#recipientId").type(recipientId);
  cy.get("#submit").click();
});