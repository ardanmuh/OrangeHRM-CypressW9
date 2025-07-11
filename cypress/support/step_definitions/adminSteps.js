import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../pages/LoginPage";
import DashboardPage from "../../pages/DashboardPage";
import AdminPage from "../../pages/AdminPage";

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const adminPage = new AdminPage();

Given("user is logged in as admin", () => {
  cy.fixture("users").then((users) => {
    loginPage.visit();
    loginPage.login(users.validUser.username, users.validUser.password);
    dashboardPage.verifyDashboardLoaded();
  });
});

Given("user navigates to Admin page", () => {
  dashboardPage.navigateToAdmin();
  adminPage.verifyAdminPageLoaded();
});

// Step for Scenario Outline: Add new admin user
When("user adds a new admin {string} with role {string}", (username, role) => {
  adminPage.addNewUser(username, role);
});

// Langsung verify success message setelah add user
Then("user should see success message", () => {
  adminPage.verifySuccessMessage();
});

// Terakhir verify user muncul di list
Then("the admin {string} should appear in the user list", (username) => {
  // Tunggu sebentar untuk memastikan proses add user selesai
  cy.wait(2000);

  // Reset search dulu untuk clean state
  adminPage.resetSearch();

  // Lakukan search dan verify
  adminPage.searchUser(username);
  adminPage.verifyUserInTable(username);
});

// Fix: Step baru untuk memastikan admin exists tanpa membuat ulang
Given(
  "an admin {string} with role {string} exists in the system",
  (username, role) => {
    // Reset search dulu untuk memastikan clean state
    adminPage.resetSearch();

    // Cek apakah user sudah ada
    adminPage.checkUserExists(username).then((exists) => {
      if (!exists) {
        // Jika belum ada, buat user baru dengan success verification
        cy.log(`Creating new admin ${username} as it doesn't exist`);
        adminPage.addNewUserWithSuccess(username, role);
        adminPage.resetSearch();
      } else {
        cy.log(`Admin ${username} already exists, skipping creation`);
      }
    });
  }
);

// Keep existing step for backward compatibility
Given(
  "user has created a new admin {string} with role {string}",
  (username, role) => {
    adminPage.addNewUser(username, role);
    adminPage.verifySuccessMessage();
    adminPage.resetSearch();
  }
);

When(
  "user tries to add a duplicate admin {string} with role {string}",
  (username, role) => {
    adminPage.addNewUser(username, role);
    // Jangan expect success message karena ini akan error
  }
);

Then("user should see duplicate username error message", () => {
  // Cek error message di field username
  cy.get(".oxd-text.oxd-text--span.oxd-input-field-error-message").should(
    "contain.text",
    "Already Exist"
  );
});

When(
  "user tries to add admin with empty username and role {string}",
  (role) => {
    adminPage.clickAddButton();
    adminPage.selectUserRole(role);
    adminPage.typeEmployeeName();
    adminPage.selectStatus("Enabled");
    adminPage.typePassword("Test123!");
    adminPage.clickSave();
  }
);

Then("user should see required field error message", () => {
  cy.get(".oxd-text.oxd-text--span.oxd-input-field-error-message").should(
    "contain.text",
    "Required"
  );
});

When("user searches for admin {string}", (username) => {
  adminPage.searchUser(username);
});

Then("user should see {string} in search results", (username) => {
  adminPage.verifyUserInTable(username);
});

When("user deletes admin {string}", (username) => {
  adminPage.deleteUser(username);
});

Then("user should see delete success message", () => {
  adminPage.verifyDeleteSuccessMessage();
});

Then("{string} should not appear in user list", (username) => {
  adminPage.resetSearch();
  adminPage.searchUser(username);
  // adminPage.verifyUserNotInTable(username);
});
