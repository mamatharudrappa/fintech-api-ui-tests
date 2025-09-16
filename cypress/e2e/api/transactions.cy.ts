import { userFactory, transactionFactory } from "../../utils/factory.js";
import { getAuthHeader } from "../../utils/auth.js";
import { logApiResponse } from "../../utils/logger.js";

const API_BASE = Cypress.env("API_BASE_URL") || "http://localhost:5000";

describe("Transactions API", () => {

    //Test to verify the create transaction and get transaction apis
    //response is verified with expected data
    //Test creates user, users the generated userid to create transaction and then get the transaction details
    it("should create a transaction and retrieve by user", () => {
        const payload = userFactory();

        cy.request({
            method: "POST",
            url: `${API_BASE}/api/users`,
            headers: getAuthHeader(),
            body: payload
        }).then(userRes => {
            const createdUser = userRes.body;
            const txPayload = transactionFactory({ userId: createdUser.id, amount: 100.5 });
            cy.request({
                method: "POST",
                url: `${API_BASE}/api/transactions`,
                headers: getAuthHeader(),
                body: txPayload
            }).then(txRes => {
                expect(txRes.status).to.eq(201);
                logApiResponse("create_transaction", txRes.body); // logging api response
                cy.request({
                    method: "GET",
                    url: `${API_BASE}/api/transactions/${createdUser.id}`,
                    headers: getAuthHeader()
                }).then(getTxRes => {
                    expect(getTxRes.status).to.eq(200);
                    expect(getTxRes.body.userid).to.eq(txRes.userid);
                    expect(getTxRes.body.amount).to.eq(100.5);
                    expect(getTxRes.body.type).to.eq(txRes.type);

                    Cypress.env("userId", txRes.userid); 
                    Cypress.env("type", txRes.type);
                    Cypress.env("recipientId", txRes.recipientId);
                });
            }); 
        });
    });


    //Test to verify the create transaction API with invalid amount
    //response status is verfied
    it("should reject invalid amount", () => {
        const payload = { userId: `${Cypress.env("userId")}`, amount: -10, type: `${Cypress.env("type")}`, recipientId: `${Cypress.env("recipientId")}` };

        cy.request({
            method: "POST",
            url: `${API_BASE}/api/transactions`,
            headers: getAuthHeader(),
            body: payload,
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.eq(422);
        });
  });
});
