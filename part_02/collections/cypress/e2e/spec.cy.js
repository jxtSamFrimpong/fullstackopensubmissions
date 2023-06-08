describe('Note App', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'mede meho aba',
      username: 'akwankwaahia',
      password: 'somebody'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)

    // cy.request('POST', 'http://localhost:3001/api/login', {
    //   username: 'akwankwaahia', password: 'somebody'
    // }).then(response => {
    //   localStorage.setItem('  ', JSON.stringify(response.body))
    //   cy.visit('http://localhost:3000')
    // })
    cy.login({ username: 'akwankwaahia', password: 'somebody' })
  })

  it('front page lives', function () {
    // eslint-disable-next-line no-undef
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Engineering, KNUST 2022')


  })

  it('a user can log in', function () {
    // cy.contains('re-login').click()
    // cy.get('#username').type('akwankwaahia')
    // cy.get('#password').type('somebody')
    // cy.get('#login-button').click()
    cy.contains('akwankwaahia')

    cy.wait(7000)
    cy.get('#new-note-button').click()
    cy.get('#create-new-note-text-field').clear().type('a note created by cypress')
    //cy.get('#create-new-note-text-field')
    cy.contains('save').click()
    cy.contains('a note created by cypress')
    cy.get('input:first').should('not.be.checked')
    cy.get('input:first').click()
    cy.wait(3000)
    cy.get('input:first').should('be.checked')
  })

  // it('a new note can be created', function () {
  //   cy.contains('new note').click()
  //   cy.get('input').clear().type('a note created by cypress')
  //   cy.contains('save').click()
  //   cy.contains('a note created by cypress')
  // })
  it.only('login fails with wrong password', function () {
    cy.contains('re-login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error').contains('Wrong credentials')

    cy.get('.error').should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
    cy.get('html').should('not.contain', 'Welcome akwankwaahia')
    cy.contains('Welcome akwankwaahia').should('not.exist')
  })
})