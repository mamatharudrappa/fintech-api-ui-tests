# Fintech Cypress Automation Framework

This project is an **end-to-end automation framework** for a hypothetical fintech microservices system.  
It covers **API tests, UI tests, test utilities, reporting, and environment management** using **Cypress + TypeScript**.


## Project Structure

cypress/

    e2e/    # Test specs (API + UI)
    
    fixtures/   # Static test data (testData.json)
    
    support/    # Custom commands, helpers, assertions
    
    results/    # Test results & reports
    
.env.ci

.env.development

.env.qa    # environment configs

cypress.config.ts   # Cypress configuration

package.json

README.md

tsconfig.json


## Features

- **API Test Suite**
  - CRUD operations
  - Error scenarios
  - Data validation
  - Authentication & authorization

- **UI Test Suite**
  - User registration flow
  - Transaction creation flow
  - Error message validation

- **Test Utilities**
  - Test data factories
  - Fixtures (`testData.json`)
  - Helper functions
  - Environment configuration
  - Custom assertions

- **Reporting**
  - Mochawesome HTML + JSON reports
  - Screenshots & videos on failures
  - API response logging


## Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/mamatharudrappa/fintech-api-ui-tests.git
   cd fintech-api-ui-tests

3. Install dependencies:

    npm install


## Running Tests
**Run all tests (headless)**
    npm run test

**Run UI tests only**
    npm run test:ui

**Run API tests only**
    npm run test:api

**Run in interactive mode**
    npm run open

**Serve mock frontend**
    npm run serve

**Clean test results**
    npm run clean


## Environment Management

**Pass tokens per environment:**

**DEV**
npm run test --env token=dev-token-123

**STAGING**
npm run test --env token=qa-token-123

**Or use different config files:**

npm run test --config-file .env.qa


## Reporting

**After running tests:**

**Merge reports:**
npx mochawesome-merge cypress/reports/*.json > cypress/reports/report.json

**Generate HTML:**
npx marge cypress/reports/report.json --reportDir cypress/reports/html

**Open final report:**
cypress/reports/html/index.html

**Screenshots & Videos**
Screenshots: cypress/screenshots/
Videos: cypress/videos/


## Notes

* Do not commit real tokens (env config files which has token should be .gitignored).
* Use CI/CD secrets for sensitive credentials.
* Reports + screenshots are auto-generated for failures.
