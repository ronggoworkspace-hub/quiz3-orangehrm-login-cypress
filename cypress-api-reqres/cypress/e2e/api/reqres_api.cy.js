describe('Reqres API Automation - Cypress', () => {
  it('GET - list users page 2', () => {
    cy.reqresRequest({
      method: 'GET',
      url: '/api/users',
      qs: {
        page: 2,
        per_page: 6
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.page).to.eq(2)
      expect(response.body.data).to.be.an('array')
      expect(response.body.data.length).to.be.greaterThan(0)
      expect(response.body.data[0]).to.have.all.keys('id', 'email', 'first_name', 'last_name', 'avatar')
    })
  })

  it('GET - single user by id', () => {
    cy.reqresRequest({
      method: 'GET',
      url: '/api/users/2'
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data.id).to.eq(2)
      expect(response.body.data.email).to.include('@reqres.in')
      expect(response.body.data).to.have.property('first_name')
      expect(response.body.data).to.have.property('last_name')
    })
  })

  it('GET - single user not found', () => {
    cy.reqresRequest({
      method: 'GET',
      url: '/api/users/23',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404)
      expect(response.body).to.be.an('object')
    })
  })

  it('GET - list resource unknown', () => {
    cy.reqresRequest({
      method: 'GET',
      url: '/api/unknown'
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data).to.be.an('array')
      expect(response.body.data[0]).to.have.all.keys('id', 'name', 'year', 'color', 'pantone_value')
    })
  })

  it('GET - single resource unknown by id', () => {
    cy.reqresRequest({
      method: 'GET',
      url: '/api/unknown/2'
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data.id).to.eq(2)
      expect(response.body.data).to.have.property('name')
      expect(response.body.data).to.have.property('year')
    })
  })

  it('POST - create user', () => {
    cy.reqresRequest({
      method: 'POST',
      url: '/api/users',
      body: {
        name: 'Sanber QA',
        job: 'QA Engineer'
      }
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.name).to.eq('Sanber QA')
      expect(response.body.job).to.eq('QA Engineer')
      expect(response.body).to.have.property('id')
      expect(response.body).to.have.property('createdAt')
    })
  })

  it('PUT - update user', () => {
    cy.reqresRequest({
      method: 'PUT',
      url: '/api/users/2',
      body: {
        name: 'Sanber Updated',
        job: 'Senior QA Engineer'
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.name).to.eq('Sanber Updated')
      expect(response.body.job).to.eq('Senior QA Engineer')
      expect(response.body).to.have.property('updatedAt')
    })
  })

  it('PATCH - partial update user', () => {
    cy.reqresRequest({
      method: 'PATCH',
      url: '/api/users/2',
      body: {
        job: 'Automation QA'
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.job).to.eq('Automation QA')
      expect(response.body).to.have.property('updatedAt')
    })
  })

  it('DELETE - delete user', () => {
    cy.reqresRequest({
      method: 'DELETE',
      url: '/api/users/2'
    }).then((response) => {
      expect(response.status).to.eq(204)
      expect(response.body).to.eq('')
    })
  })

  it('POST - login success', () => {
    cy.reqresRequest({
      method: 'POST',
      url: '/api/login',
      body: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('token')
      expect(response.body.token).to.be.a('string').and.not.be.empty
    })
  })

  it('POST - login failed without password', () => {
    cy.reqresRequest({
      method: 'POST',
      url: '/api/login',
      failOnStatusCode: false,
      body: {
        email: 'peter@klaven'
      }
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body).to.have.property('error')
    })
  })
})
