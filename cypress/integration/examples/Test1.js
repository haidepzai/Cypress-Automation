/// <reference types="Cypress" />
//für autocomplete
describe('My First Test', () => {
    it('clicks the link "type"', () => {

      cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
      //get wie documentgetelementby
      cy.get('.search-keyword').type('ca')
      cy.wait(2000)
      //:visible = nur sichtbare Elemente; should is an assertion (assert)
      cy.get('.product:visible').should('have.length', 4)
      //Parent child chaining - find sucht nur innerhalb .products
      cy.get('.products').as('productLocator') //alias (define once, reused multiple time)
      cy.get('@productLocator').find('.product').should('have.length', 4)        
      //eq das 2. Element auswählen
      cy.get('@productLocator').find('.product').eq(2).contains('ADD TO CART').click()
  
      //Es gibt 4 product -> Array, deswegen each
      cy.get('@productLocator').find('.product').each(($el, index, $list) => {
        const textVeg = $el.find('h4.product-name').text()
        //includes wie contains/substring
        if(textVeg.includes('Cashews')) {
            cy.wrap($el).find('button').click()
        }
      })
        
      //geht nicht
      const logo = cy.get('.brand')
      //cy.log(logo.text()) //Error

      //Promise (then) muss hier gemacht werden
      //Manuel Resolving of Promise
      //Weil das in einer Variable gespeichert werden
      //Oben ist zwar auch Promise, aber hidden 
      //(wird von Cypress im Hintergrund aufgeführt)
      cy.get('.brand').then(function(logoelement)
      {
          cy.log(logoelement.text())
      })
      //das geht auch nicht, da text() kein cypress command ist
      //cy.get('.brand').text()
      //text() ist ein jQuery Methode (Cypress unterstützt jQuery)
      
      cy.get('.brand').should('have.text', 'GREENKART')
    
    })
  })

  //Commands are Asynchronous, Commands are Promises