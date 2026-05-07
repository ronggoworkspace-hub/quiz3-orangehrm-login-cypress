class LoginPage {
  usernameInput() {
    return cy.get('input[name="username"]');
  }

  passwordInput() {
    return cy.get('input[name="password"]');
  }

  loginButton() {
    return cy.contains('button', 'Login');
  }

  forgotPasswordLink() {
    return cy.contains('.orangehrm-login-forgot-header', 'Forgot your password?');
  }

  invalidCredentialsAlert() {
    return cy.contains('.oxd-alert-content-text', 'Invalid credentials');
  }

  requiredMessages() {
    return cy.get('.oxd-input-field-error-message');
  }

  visit() {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/web/index.php/auth/login');
  }

  assertLoginPageLoaded() {
    cy.url().should('include', '/web/index.php/auth/login');
    this.usernameInput().should('be.visible');
    this.passwordInput().should('be.visible');
    this.loginButton().should('be.visible');
  }

  assertStayOnLoginPage() {
    cy.url().should('include', '/web/index.php/auth/login');
  }

  typeUsername(username) {
    this.usernameInput().clear();

    if (username) {
      this.usernameInput().type(username);
    }
  }

  typePassword(password) {
    this.passwordInput().clear();

    if (password) {
      this.passwordInput().type(password, { log: false });
    }
  }

  clickLogin() {
    this.loginButton().click();
  }

  login(username, password) {
    this.typeUsername(username);
    this.typePassword(password);
    this.clickLogin();
  }

  submitWithEnter(username, password) {
    this.typeUsername(username);
    this.passwordInput().clear().type(`${password}{enter}`, { log: false });
  }

  clickForgotPassword() {
    this.forgotPasswordLink().click();
  }

  assertInvalidCredentialsMessage() {
    this.invalidCredentialsAlert().should('be.visible');
  }

  assertRequiredMessageCount(expectedCount) {
    this.requiredMessages()
      .should('have.length', expectedCount)
      .each(($message) => {
        cy.wrap($message).should('have.text', 'Required');
      });
  }
}

export default LoginPage;
