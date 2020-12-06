/// <reference types="Cypress" />
//für autocomplete
describe('My Sixth Test', () => {
    it('Mouse Over', () => {
      cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    
      //jQuery Methode show invoken
      //The show() method shows the hidden, selected elements.
      //direktes mouseover existiert in cypress nicht, deswegen jQuery show
      cy.get('div.mouse-hover-content').invoke('show') 
      cy.contains('Top').click()
      cy.url().should('include', 'top')

      //So kann man click erzwingen, auch wenn es hidden ist
      //man braucht die jQuery Methode show dann nicht
      cy.contains('Top').click({force: true})

    })
  })

  //Commands are Asynchronous, Commands are Promises