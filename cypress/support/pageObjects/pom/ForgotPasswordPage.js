class ForgotPasswordPage {
  resetPasswordTitle() {
    return cy.contains('h6', 'Reset Password');
  }

  usernameInput() {
    return cy.get('input[name="username"]');
  }

  cancelButton() {
    return cy.contains('button', 'Cancel');
  }

  resetPasswordButton() {
    return cy.contains('button', 'Reset Password');
  }

  assertForgotPasswordPageLoaded() {
    cy.url().should('include', '/web/index.php/auth/requestPasswordResetCode');
    this.resetPasswordTitle().should('be.visible');
    this.usernameInput().should('be.visible');
    this.cancelButton().should('be.visible');
    this.resetPasswordButton().should('be.visible');
  }

  clickCancel() {
    this.cancelButton().click();
  }
}

export default ForgotPasswordPage;
