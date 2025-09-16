import { defineConfig } from "cypress";
import * as dotenv from "dotenv";
import fs from "fs";

const envFile = process.env.NODE_ENV === "ci" ? ".env.ci" : ".env.qa";
if (fs.existsSync(envFile)) dotenv.config({ path: envFile });

export default defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || "http://localhost:5000",
    setupNodeEvents(on, config) {
      // reporter config for mochawesome
      require("cypress-mochawesome-reporter/plugin")(on);

      on("after:spec", (spec, results) => {
        if (results && results.video) {
          // keep videos only if failures
          if (results.tests.every(t => t.state === "passed")) {
            fs.unlinkSync(results.video);
          }
        }
      });
      return config;
    }
  },
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/results",
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    embeddedScreenshots: true
  },
  screenshotsFolder: "cypress/screenshots",
  videosFolder: "cypress/videos",
  screenshotOnRunFailure: true
});
