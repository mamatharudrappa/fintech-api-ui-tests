
describe("UI - Transaction creation flow", () => {
    beforeEach(function () {
        cy.visit("/transactions/new");
        cy.fixture("userData").as("users");
    });

    // Test to verify transaction creation
    // Custom command is used
    it("should create a transaction successfully", function () {
        const user = this.users.seed_user; // using existing user
        
        cy.createTransaction(user.userId, 100, "transfer", user.recipientId);
        cy.contains("Transaction successful").should("be.visible");
    });


    // Test to verify error message for invalid amount
    it("should show error for invalid amount", () => {
        cy.get("#userId").type("123");
        cy.get("#amount").type("-10");
        cy.get("#submit").click();

        cy.contains("Invalid amount").should("be.visible");
    });
});