import { userFactory } from "../../utils/factory.js";
import { logApiResponse } from "../../utils/logger.js";
import { getAuthHeader } from "../../utils/auth.js";

const API_BASE = Cypress.env("API_BASE_URL") || "http://localhost:5000";

describe("Users API", () => {

    //Test for verifying successful creation of user
    //response is verified with given payload values
    //response status and id generation is verified
    it("should create a user successfully", () => {
        const payload = userFactory({ accountType: "premium" });

        cy.request({
            method: "POST",
            url: `${API_BASE}/api/users`,
            headers: getAuthHeader(),
            body: payload,
            failOnStatusCode: false
        }).then(res => {
            logApiResponse("create_user", res.body);
            expect(res.status).to.eq(201);
            expect(res.body).to.include({ name: payload.name, email: payload.email});
            expect(res.body).to.have.property("id");
            //set env variable userid, name and email with the value of id in the response
            //to use this userid, name and email for get call test later
            Cypress.env("userId", res.body.id);  //assuming response has id returned (doc doesnot say anything about it)
            Cypress.env("name", res.body.name);
            Cypress.env("email", res.body.email);
        });
    });

    //Test for verifying API with partial payload
    //response status and error is verified
    it("should validate error for missing email", () => {
        cy.request({
            method: "POST",
            url: `${API_BASE}/api/users`,
            headers: getAuthHeader(),
            body: { name: "John Doe" },
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.eq(400);
            expect(res.body).to.have.property("errors");
        });
    }); 

    //Test for verifying API call without auth
    //response status is verified
    it("should rejects without auth", () => {
        cy.request({
            method: "POST",
            url: `${API_BASE}/api/users`,
            body: userFactory(),
            failOnStatusCode: false
        }).then(res => {
            expect([401, 403]).to.include(res.status);
            logApiResponse("create_transaction", res.body); // logging api response
        });
    });

    //Test for verrifying GET call to get user details
    //response status and values are verfied
    it("should get user details", () => {
        cy.request({
            method: "GET", 
            url: `${API_BASE}/api/users/${Cypress.env("userId")}`, // using env variable userId, which was set during user creation
            headers: getAuthHeader()
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.name).to.eq(`${Cypress.env("name")}`);
            expect(res.body.email).to.eq(`${Cypress.env("email")}`);
        });
    });

    //Test to verify GET call with invalid userId
    //response status is verified
    it("should handle invalid user ID", () => {
        const invalidId = 123;

        cy.request({
            method: "GET",
            url: `${API_BASE}/api/users/${invalidId}`,
            headers: getAuthHeader(),
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eq(404);
        });
    });
})