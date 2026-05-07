import LoginPage from '../../support/pageObjects/pom/LoginPage';
import DashboardPage from '../../support/pageObjects/pom/DashboardPage';
import ForgotPasswordPage from '../../support/pageObjects/pom/ForgotPasswordPage';

describe('Quiz 4 - OrangeHRM Login with POM', () => {
  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();
  const forgotPasswordPage = new ForgotPasswordPage();

  let loginData;

  before(() => {
    cy.fixture('pom/loginData').then((data) => {
      loginData = data;
    });
  });

  beforeEach(() => {
    loginPage.visit();
    loginPage.assertLoginPageLoaded();
  });

  it('TC01 - User berhasil login dengan username dan password valid', () => {
    loginPage.login(
      loginData.validCredentials.username,
      loginData.validCredentials.password,
    );

    dashboardPage.assertDashboardLoaded();
  });

  it('TC02 - User gagal login dengan username valid dan password salah', () => {
    loginPage.login(
      loginData.invalidPassword.username,
      loginData.invalidPassword.password,
    );

    loginPage.assertInvalidCredentialsMessage();
    loginPage.assertStayOnLoginPage();
  });

  it('TC03 - User gagal login dengan username salah dan password valid', () => {
    loginPage.login(
      loginData.invalidUsername.username,
      loginData.invalidUsername.password,
    );

    loginPage.assertInvalidCredentialsMessage();
    loginPage.assertStayOnLoginPage();
  });

  it('TC04 - User gagal login dengan username dan password salah', () => {
    loginPage.login(
      loginData.invalidBoth.username,
      loginData.invalidBoth.password,
    );

    loginPage.assertInvalidCredentialsMessage();
    loginPage.assertStayOnLoginPage();
  });

  it('TC05 - User gagal login ketika username kosong', () => {
    loginPage.login(
      loginData.emptyUsername.username,
      loginData.emptyUsername.password,
    );

    loginPage.assertRequiredMessageCount(1);
    loginPage.assertStayOnLoginPage();
  });

  it('TC06 - User gagal login ketika password kosong', () => {
    loginPage.login(
      loginData.emptyPassword.username,
      loginData.emptyPassword.password,
    );

    loginPage.assertRequiredMessageCount(1);
    loginPage.assertStayOnLoginPage();
  });

  it('TC07 - User gagal login ketika username dan password kosong', () => {
    loginPage.login(
      loginData.emptyBoth.username,
      loginData.emptyBoth.password,
    );

    loginPage.assertRequiredMessageCount(2);
    loginPage.assertStayOnLoginPage();
  });

  it('TC08 - User dapat membuka halaman forgot password lalu kembali ke halaman login', () => {
    loginPage.clickForgotPassword();

    forgotPasswordPage.assertForgotPasswordPageLoaded();
    forgotPasswordPage.clickCancel();

    loginPage.assertLoginPageLoaded();
  });

  it('TC09 - User berhasil login dengan tombol Enter pada field password', () => {
    loginPage.submitWithEnter(
      loginData.validCredentials.username,
      loginData.validCredentials.password,
    );

    dashboardPage.assertDashboardLoaded();
  });
});
