class DashboardPage {
  dashboardTitle() {
    return cy.contains('h6', 'Dashboard');
  }

  userDropdownName() {
    return cy.get('.oxd-userdropdown-name');
  }

  assertDashboardLoaded() {
    cy.url().should('include', '/web/index.php/dashboard/index');
    this.dashboardTitle().should('be.visible');
    this.userDropdownName().should('be.visible');
  }
}

export default DashboardPage;
