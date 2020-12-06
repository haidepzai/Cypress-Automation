/// <reference types="Cypress" />
//für autocomplete
describe('My Third Test', () => {
    it('Checkbox and Dropdown', () => {
      cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
      
      //Checkbox
      cy.get('#checkBoxOption1').check().should('be.checked') //behaviour
        .and('have.value', 'option1') //actual, expected
      cy.get('#checkBoxOption1').uncheck().should('not.be.checked')

      //check multiple checkbox in one line (get an array of checkboxes)
      cy.get('input[type="checkbox"]').check(['option2', 'option3'])
        
      //Static Dropdown
      cy.get('select').select('option2').should('have.value', 'option2')

      //Dynamic Dropdown (autocomplete field)
      cy.get('#autocomplete').type('ind') //Feld
      //3 Items die angezeigt werden 
      //(als array, welches man iterieren muss mit each)
      cy.get('.ui-menu-item div').each(($el, index, $list) => {

        if($el.text() === "India"){
          $el.trigger("click")
        }

      })
      cy.get('#autocomplete').should('have.value', 'India')   
      
      //Handle visible and invisible elements
      cy.get('#displayed-text').should('be.visible')
      cy.get('#hide-textbox').click()
      cy.get('#displayed-text').should('not.be.visible')
      cy.get('#show-textbox').click()
      cy.get('#displayed-text').should('be.visible')

      //Radio Buttons
      cy.get('[value="radio2"').check().should('be.checked')
    })
  })

  //Commands are Asynchronous, Commands are Promises