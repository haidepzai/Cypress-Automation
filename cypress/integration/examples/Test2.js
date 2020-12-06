/// <reference types="Cypress" />
//für autocomplete
describe('My Second Test', () => {
    it('Another Test', () => {
      cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
      //get wie documentgetelementby
      cy.get('.search-keyword').type('ca')
      cy.wait(2000)
      //Parent child chaining - find sucht nur innerhalb .products
      cy.get('.products').as('productLocator') //alias (define once, reused multiple time)

      //Es gibt 4 product -> Array, deswegen each
      cy.get('@productLocator').find('.product').each(($el, index, $list) => {
        const textVeg = $el.find('h4.product-name').text()
        //includes wie contains/substring
        if(textVeg.includes('Cashews')) {
            cy.wrap($el).find('button').click()
        }
      })    
      cy.get('.cart-icon > img').click()
      cy.contains('PROCEED TO CHECKOUT').click()
      cy.contains('Place Order').click()
    })
  })

  //Commands are Asynchronous, Commands are Promises