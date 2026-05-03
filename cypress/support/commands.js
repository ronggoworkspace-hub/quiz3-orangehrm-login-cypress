Cypress.Commands.add('visitLoginPage', () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/web/index.php/auth/login');
    cy.get('input[name="username"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
});

Cypress.Commands.add('isiusername', (username) => {
    cy.get('input[name="username"]').clear().type(username);
});

Cypress.Commands.add('isipassword', (password) => {
    cy.get('input[name="password"]').clear().type(password);
});

Cypress.Commands.add('clickbuttonlogin', () => {
    cy.contains('button','Login').click();
});

Cypress.Commands.add('loginOrangeHRM', (username, password) => {
    cy.isiusername(username);
    cy.isipassword(password);
    cy.clickbuttonlogin();
});

Cypress.Commands.add('assertLoginSuccess', () => {
    cy.url().should('include', '/web/index.php/dashboard/index');
    cy.contains('h6', 'Dashboard').should('be.visible');
});

Cypress.Commands.add('assertInvalidCredentials', () => {
    cy.contains('Invalid credentials').should('be.visible');
});

Cypress.Commands.add('assertRequiredMessage', () => {
    cy.contains('Required').should('be.visible');
});