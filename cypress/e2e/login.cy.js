describe('QUIZ 3 OrangeHRM Fitur Login', () => {
  const validUsername = 'Admin';
  const validPassword = 'admin123';

  beforeEach(() => {
    cy.visitLoginPage();
  });

  it('Testcase 1 - Login berhasil username dan password valid', () => {
    cy.loginOrangeHRM(validUsername, validPassword);
    cy.assertLoginSuccess();
  });

  it('Testcase 2 - Login gagal username benar dan password salah', () => {
    cy.loginOrangeHRM(validUsername, 'ronggo123');
    cy.assertInvalidCredentials();
  });

  it ('Testcase 3 - Login gagal username salah dan password benar', () => {
    cy.loginOrangeHRM('ronggoganteng', validPassword);
    cy.assertInvalidCredentials();
  });

  it ('Testcase 4 - Login gagal username benar dan password kosong', () => {
    cy.isiusername(validUsername);
    cy.clickbuttonlogin();
    cy.assertRequiredMessage();
  });

  it ('Testcase 5 - Login gagal username kosong dan password benar', () => {
    cy.isipassword(validPassword);
    cy.clickbuttonlogin();
    cy.assertRequiredMessage();
  });

  it ('Testcase 6 - Login gagal username kosong dan password kosong', () => {
    cy.clickbuttonlogin();
    cy.assertRequiredMessage();
  });

  it ('Testcase 7 - Login gagal username berisi spasi', () => {
    cy.loginOrangeHRM('a dmin', 'validPassowrd')
    cy.assertInvalidCredentials();
  });

  it ('Testcase 8 - Login gagal password berisi spasi', () => {
    cy.loginOrangeHRM('validUsername', 'admin 123')
    cy.assertInvalidCredentials();
  });

  it ('Testcase 9 - Login gagal password berisi huruf kapital', () => {
    cy.loginOrangeHRM('validUsername', 'Admin123')
    cy.assertInvalidCredentials();
  });

});