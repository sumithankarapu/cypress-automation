const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const mochawesome = require("cypress-mochawesome-reporter/plugin");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true
  },
  video: true,
  screenshotOnRunFailure: true,
  e2e: {
    specPattern: "cypress/e2e/**/*.{cy.js,feature}",
    baseUrl: "https://your-app-url.com",

    setupNodeEvents(on, config) {
      // Attach reporters
      mochawesome(on);

      // Attach cucumber preprocessor
      addCucumberPreprocessorPlugin(on, config);

      // Use esbuild bundler
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },
  },
});
