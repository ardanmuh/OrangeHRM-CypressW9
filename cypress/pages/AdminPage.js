class AdminPage {
  // Selectors
  get pageTitle() {
    return cy.get(".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module");
  }
  get systemUsersTitle() {
    return cy.get(".oxd-text.oxd-text--h5.oxd-table-filter-title");
  }
  get addButton() {
    return cy
      .get(".oxd-button.oxd-button--medium.oxd-button--secondary")
      .contains("Add");
  }
  get userRoleDropdown() {
    return cy.get(".oxd-select-text-input").first();
  }
  get employeeNameInput() {
    return cy.get('[placeholder="Type for hints..."]');
  }
  get statusDropdown() {
    return cy.get(".oxd-select-text-input").last();
  }
  get usernameInput() {
    return cy.get(".oxd-input").eq(1);
  }
  get passwordInput() {
    return cy.get('[type="password"]').first();
  }
  get confirmPasswordInput() {
    return cy.get('[type="password"]').last();
  }
  get saveButton() {
    return cy.get('[type="submit"]');
  }
  get successMessage() {
    return cy.get(".oxd-text.oxd-text--p.oxd-text--toast-message");
  }

  // Alternative selectors untuk toast message
  get toastMessage() {
    return cy.get(".oxd-toast-container .oxd-toast-content");
  }

  get toastText() {
    return cy.get(".oxd-toast-container .oxd-text--toast-message");
  }
  get searchUsernameInput() {
    // Fix: Gunakan selector yang lebih spesifik untuk search username di admin page
    return cy
      .get(".oxd-form-row")
      .first()
      .find(".oxd-input")
      .should("be.visible");
  }
  get searchButton() {
    return cy.get('[type="submit"]').contains("Search");
  }
  get userTable() {
    return cy.get(".oxd-table-body");
  }
  get deleteButton() {
    return cy.get(".oxd-icon.bi-trash");
  }
  get confirmDeleteButton() {
    return cy.get(".oxd-button.oxd-button--medium.oxd-button--label-danger");
  }
  get resetButton() {
    return cy.get('[type="button"]').contains("Reset");
  }

  // Actions
  verifyAdminPageLoaded() {
    cy.url().should("include", "/admin/viewSystemUsers");
    // Verify breadcrumb shows "Admin"
    this.pageTitle.should("contain.text", "Admin");
    // Verify Add button is visible as indicator page is loaded
    this.addButton.should("be.visible");
  }

  clickAddButton() {
    this.addButton.click();
  }

  selectUserRole(role) {
    this.userRoleDropdown.click();
    cy.get(".oxd-select-option").contains(role).click();
  }

  typeEmployeeName(name) {
    cy.log(`Selecting employee from dropdown`);

    // Input nama karyawan dan tunggu dropdown muncul
    cy.get('input[placeholder="Type for hints..."]')
      .should("be.visible")
      .clear()
      .type("a", { delay: 1000 }); // atau ketik 'a'
    cy.wait(500);

    // Tunggu sampai dropdown muncul dan siap diklik
    cy.get(".oxd-autocomplete-dropdown").should("exist").and("be.visible");

    // Pastikan minimal 1 item muncul di dropdown
    cy.get(".oxd-autocomplete-dropdown > *", { timeout: 8000 })
      .should("have.length.greaterThan", 0)
      .first()
      .click();
  }

  selectStatus(status) {
    this.statusDropdown.click();
    cy.get(".oxd-select-option").contains(status).click();
  }

  typeUsername(username) {
    this.usernameInput.clear().type(username);
  }

  typePassword(password) {
    this.passwordInput.clear().type(password);
    this.confirmPasswordInput.clear().type(password);
  }

  clickSave() {
    this.saveButton.click();
    // Tunggu sebentar untuk proses save
    cy.wait(1000);
  }

  verifySuccessMessage() {
    // Tunggu toast muncul dengan timeout yang cukup
    cy.get(".oxd-toast-container", { timeout: 10000 })
      .should("be.visible")
      .within(() => {
        cy.get(".oxd-text--toast-message")
          .should("be.visible")
          .and("contain.text", "Successfully Saved");
      });

    // Alternative: Coba selector yang lebih umum jika yang atas gagal
    // cy.contains("Successfully Saved", { timeout: 10000 }).should("be.visible");
  }

  verifyDeleteSuccessMessage() {
    cy.get(".oxd-toast-container", { timeout: 10000 })
      .should("be.visible")
      .within(() => {
        cy.get(".oxd-text--toast-message")
          .should("be.visible")
          .and("contain.text", "Successfully Deleted");
      });
  }

  searchUser(username) {
    // Fix: Gunakan selector yang benar untuk search username dengan error handling
    cy.get(".oxd-form-row")
      .first()
      .find(".oxd-input")
      .should("be.visible")
      .should("not.be.disabled")
      .then(($input) => {
        // Clear input dengan cara yang lebih aman
        cy.wrap($input).clear({ force: true });
        cy.wrap($input).type(username, { force: true });
      });

    this.searchButton.click();
    cy.wait(1000); // Tunggu hasil search
  }

  verifyUserInTable(username) {
    // Tunggu table loading selesai
    cy.get(".oxd-table-body", { timeout: 10000 })
      .should("be.visible")
      .should("contain.text", username);
  }

  verifyUserNotInTable(username) {
    // Tunggu table loading selesai dan pastikan user tidak ada
    cy.get(".oxd-table-body", { timeout: 5000 })
      .should("be.visible")
      .should("not.contain.text", username);
  }

  // Fix: Tambahkan method untuk cek apakah user sudah ada
  checkUserExists(username) {
    this.searchUser(username);
    cy.wait(2000);

    return cy.get("body").then(($body) => {
      const hasNoRecords = $body
        .find(".oxd-table-body")
        .text()
        .includes("No Records Found");
      return !hasNoRecords;
    });
  }

  deleteUser(username) {
    this.searchUser(username);
    cy.wait(2000);
    this.deleteButton.first().click();
    this.confirmDeleteButton.click();
  }

  addNewUser(username, role, password = "Test123!") {
    this.clickAddButton();
    this.selectUserRole(role);
    this.typeEmployeeName(); // Fix: Hapus parameter karena method ini sudah hardcoded
    this.selectStatus("Enabled");
    this.typeUsername(username);
    this.typePassword(password);
    this.clickSave();
    // Tidak langsung expect success message karena bisa jadi error
  }

  // Method khusus untuk add user yang pasti berhasil
  addNewUserWithSuccess(username, role, password = "Test123!") {
    this.addNewUser(username, role, password);
    this.verifySuccessMessage();
  }

  resetSearch() {
    this.resetButton.click();
  }
}

export default AdminPage;
