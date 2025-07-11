import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../pages/LoginPage";
import DashboardPage from "../../pages/DashboardPage";

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

Given("user is on the login page", () => {
  loginPage.visit();
});

When(
  "user logs in using username {string} and password {string}",
  (username, password) => {
    loginPage.login(username, password);
  }
);

Then("user should see the dashboard page", () => {
  dashboardPage.verifyDashboardLoaded();
});

Then("user should see error message {string}", (message) => {
  if (message === "Required") {
    loginPage.verifyRequiredMessage();
  } else {
    loginPage.verifyErrorMessage(message);
  }
});
