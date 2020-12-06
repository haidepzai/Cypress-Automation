/// <reference types="Cypress" />
//für autocomplete
describe('My Fifth Test', () => {
    it('Table', () => {
      cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
     
      //Die Tabelle auswählen und nur die 2. Spalte (11 Elemente als Array)
      cy.get('tr td:nth-child(2)').each(($el, index, $list) => {

        const text = $el.text()

        if(text.includes("Python")){

          //next auf get anwenden und nicht auf $el.text, da Promise schon resolved
          cy.get('tr td:nth-child(2)').eq(index).next() //eq(index) das 7. Element
            .then((price) => { //Promise resolven

              const priceText = price.text()
              expect(priceText).to.equal('25')
            })
        }

      })

    })
  })

  //Commands are Asynchronous, Commands are Promises