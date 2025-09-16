import { userFactory } from "../../utils/factory.js";

describe("UI - User registration Flow", () => {

    beforeEach(() => {
        cy.visit("/register");
    });

    // Test to verify user registration flow
    // It mocks the API response to check the UI behaviour for successful user creation
    it("should register user successfully", () => {
        const payload = userFactory();

        // Sends a fake response to user creation api call
        // If UI behaviour should be checked with actual response 
        // then cy.intercept can be removed as in the next test (email missing test)
        // custom command is used
        cy.intercept("POST", "/api/users", {
        statusCode: 201,
        body: {...payload, id: "abc-123"}
        }).as("createUser");

        cy.registerUser(payload.name, payload.email, payload.accountType);

        cy.wait("@createUser");
        cy.get("#message").should("contain", "Created user: abc-123");
    });


    // Test to verify flow in user registration flow
    it("should shows error when email is missing", () => {
        cy.get("#name").type("Test");
        cy.get("#email").clear();
        cy.get("button[type=submit]").click();

        cy.contains("Email is required").should("be.visible");
    });
});
