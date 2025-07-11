class DashboardPage {
  // Selectors
  get dashboardTitle() {
    return cy.get(".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module");
  }
  get adminMenu() {
    return cy.get(".oxd-main-menu-item").contains("Admin");
  }
  get userDropdown() {
    return cy.get(".oxd-userdropdown-tab");
  }
  get logoutButton() {
    return cy.get('[role="menuitem"]').contains("Logout");
  }
  get sideMenu() {
    return cy.get(".oxd-main-menu");
  }

  // Actions
  verifyDashboardLoaded() {
    cy.url().should("include", "/dashboard/index");
    this.dashboardTitle.should("be.visible");
  }

  navigateToAdmin() {
    this.adminMenu.click();
    cy.url().should("include", "/admin/viewSystemUsers");
  }

  logout() {
    this.userDropdown.click();
    this.logoutButton.click();
  }
}

export default DashboardPage;
