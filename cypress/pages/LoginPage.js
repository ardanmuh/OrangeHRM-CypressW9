class LoginPage {
  // Selectors
  get usernameInput() {
    return cy.get('[name="username"]');
  }
  get passwordInput() {
    return cy.get('[name="password"]');
  }
  get loginButton() {
    return cy.get('[type="submit"]');
  }
  get errorMessage() {
    return cy.get('[role="alert"]');
  }
  get requiredMessage() {
    return cy.get(".oxd-text.oxd-text--span.oxd-input-field-error-message");
  }

  // Actions
  visit() {
    cy.visit("/web/index.php/auth/login");
    cy.url().should("include", "/auth/login");
  }

  login(username, password) {
    if (username) {
      this.usernameInput.clear().type(username);
    }
    if (password) {
      this.passwordInput.clear().type(password);
    }
    this.loginButton.click();
  }

  verifyErrorMessage(message) {
    this.errorMessage.should("contain.text", message);
  }

  verifyRequiredMessage() {
    this.requiredMessage.should("contain.text", "Required");
  }
}

export default LoginPage;
