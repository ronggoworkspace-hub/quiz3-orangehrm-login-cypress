describe('Quiz 3 OrangeHRM Login - Intercept', () => {
const loginUrl = '/web/index.php/auth/login';
const dashboardUrl = '/web/index.php/dashboard/index';
const validUsername = 'Admin';
const validPassword = 'admin123';

const visitLoginPage = () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(loginUrl);
    cy.get('input[name="username"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.contains('button', 'Login').should('be.visible');
};

const fillUsername = (username) => {
    cy.get('input[name="username"]').clear().type(username);
};

const fillPassword = (password) => {
    cy.get('input[name="password"]').clear().type(password, { log: false });
};

const clickLogin = () => {
    cy.contains('button', 'Login').click();
};

const bodyToText = (body) => {
    if (typeof body === 'string') {
    return body;
    }

    if (body instanceof FormData) {
    const params = new URLSearchParams();
    body.forEach((value, key) => {
        params.append(key, value);
    });
    return params.toString();
    }

    if (body && typeof body === 'object') {
    return new URLSearchParams(body).toString();
    }

    return String(body ?? '');
};

beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
});

it.skip('TC01 - Berhasil membuka halaman login', () => {
    cy.intercept('GET', '**/web/index.php/auth/login').as('getLoginPage');

    visitLoginPage();

    cy.wait('@getLoginPage').then((interception) => {
    expect(interception.request.method).to.eq('GET');
    expect(interception.response.statusCode).to.eq(200);
    expect(interception.request.url).to.include('/web/index.php/auth/login');
    });

    cy.get('input[name="username"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.contains('button', 'Login').should('be.visible');
});

it.skip('TC02 - Login berhasil dengan username dan password valid', () => {
    cy.intercept('POST', '**/web/index.php/auth/validate').as('postLoginValid');
    cy.intercept('GET', '**/web/index.php/dashboard/index').as('getDashboardPage');

    visitLoginPage();
    fillUsername(validUsername);
    fillPassword(validPassword);
    clickLogin();

    cy.wait('@postLoginValid').then((interception) => {
    const payload = bodyToText(interception.request.body);

    expect(interception.request.method).to.eq('POST');
    expect(interception.request.url).to.include('/web/index.php/auth/validate');
    expect(payload).to.include(`username=${validUsername}`);
    expect(payload).to.include(`password=${validPassword}`);
    });

    cy.wait('@getDashboardPage').then((interception) => {
    expect(interception.request.method).to.eq('GET');
    expect(interception.response.statusCode).to.eq(200);
    expect(interception.request.url).to.include('/web/index.php/dashboard/index');
    });

    cy.url().should('include', dashboardUrl);
    cy.contains('h6', 'Dashboard').should('be.visible');
});

it.skip('TC03 - Login gagal dengan password salah', () => {
    cy.intercept('POST', '**/web/index.php/auth/validate').as('postWrongPassword');

    visitLoginPage();
    fillUsername(validUsername);
    fillPassword('ronggo123');
    clickLogin();

    cy.wait('@postWrongPassword').then((interception) => {
    const payload = bodyToText(interception.request.body);

    expect(interception.request.method).to.eq('POST');
    expect(payload).to.include(`username=${validUsername}`);
    expect(payload).to.include('password=ronggo123');
    });

    cy.contains('.oxd-alert-content-text', 'Invalid credentials').should('be.visible');
    cy.url().should('include', loginUrl);
});

it('TC04 - Login gagal dengan username salah', () => {
    cy.intercept('POST', '**/web/index.php/auth/validate').as('postWrongUsername');

    visitLoginPage();
    fillUsername('ronggoganteng');
    fillPassword(validPassword);
    clickLogin();

    cy.wait('@postWrongUsername').then((interception) => {
    const payload = bodyToText(interception.request.body);

    expect(interception.request.method).to.eq('POST');
    expect(payload).to.include('username=ronggoganteng');
    expect(payload).to.include(`password=${validPassword}`);
    });

    cy.contains('.oxd-alert-content-text', 'Invalid credentials').should('be.visible');
    cy.url().should('include', loginUrl);
});

it('TC05 - Login gagal dengan username dan password salah', () => {
    cy.intercept('POST', '**/web/index.php/auth/validate').as('postWrongBoth');

    visitLoginPage();
    fillUsername('salahuser');
    fillPassword('salahpass');
    clickLogin();

    cy.wait('@postWrongBoth').then((interception) => {
    const payload = bodyToText(interception.request.body);

    expect(interception.request.method).to.eq('POST');
    expect(payload).to.include('username=salahuser');
    expect(payload).to.include('password=salahpass');
    });

    cy.contains('.oxd-alert-content-text', 'Invalid credentials').should('be.visible');
    cy.url().should('include', loginUrl);
});

it('TC06 - Login gagal saat username kosong', () => {
    cy.intercept('POST', '**/web/index.php/auth/validate').as('postNoUsername');

    visitLoginPage();
    fillPassword(validPassword);
    clickLogin();

    cy.contains('.oxd-input-field-error-message', 'Required').should('be.visible');
    cy.get('@postNoUsername.all').should('have.length', 0);
});

it('TC07 - Login gagal saat password kosong', () => {
    cy.intercept('POST', '**/web/index.php/auth/validate').as('postNoPassword');

    visitLoginPage();
    fillUsername(validUsername);
    clickLogin();

    cy.contains('.oxd-input-field-error-message', 'Required').should('be.visible');
    cy.get('@postNoPassword.all').should('have.length', 0);
});

it('TC08 - Login gagal saat username dan password kosong', () => {
    cy.intercept('POST', '**/web/index.php/auth/validate').as('postEmptyCredentials');

    visitLoginPage();
    clickLogin();

    cy.get('.oxd-input-field-error-message').should('have.length', 2);
    cy.get('@postEmptyCredentials.all').should('have.length', 0);
});

it('TC09 - Login berhasil dengan tombol Enter', () => {
    cy.intercept('POST', '**/web/index.php/auth/validate').as('postLoginWithEnter');
    cy.intercept('GET', '**/web/index.php/dashboard/index').as('getDashboardByEnter');

    visitLoginPage();
    fillUsername(validUsername);
    cy.get('input[name="password"]')
    .clear()
    .type(`${validPassword}{enter}`, { log: false });

    cy.wait('@postLoginWithEnter').then((interception) => {
    const payload = bodyToText(interception.request.body);

    expect(interception.request.method).to.eq('POST');
    expect(interception.request.headers).to.have.property('content-type');
    expect(payload).to.include(`username=${validUsername}`);
    expect(payload).to.include(`password=${validPassword}`);
    });

    cy.wait('@getDashboardByEnter').then((interception) => {
    expect(interception.request.method).to.eq('GET');
    expect(interception.response.statusCode).to.eq(200);
    });

    cy.url().should('include', dashboardUrl);
    cy.contains('h6', 'Dashboard').should('be.visible');
});
});