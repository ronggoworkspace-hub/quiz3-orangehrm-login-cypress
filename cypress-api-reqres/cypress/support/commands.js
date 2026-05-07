Cypress.Commands.add('reqresRequest', (options = {}) => {
  const apiKey = Cypress.env('REQRES_API_KEY') || 'reqres-free-v1'

  return cy.request({
    failOnStatusCode: true,
    retryOnNetworkFailure: true,
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      ...(options.headers || {})
    }
  })
})
