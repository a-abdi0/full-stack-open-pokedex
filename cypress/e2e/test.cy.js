describe('Pokedex', function () {
  it('front page can be opened', function () {
    cy.visit('http://localhost:8080')
    cy.contains('ivysaur')

    cy.contains('Speed')
    cy.contains('Special Defense')
  })
  it('can navigate to a Pokemon page', function () {
    cy.visit('http://localhost:8080')
    cy.contains('ivysaur').click()
    cy.contains('overgrow')
    cy.contains('chlorophyll')
  })
})