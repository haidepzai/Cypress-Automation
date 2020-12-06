/// <reference types="Cypress" />
//für autocomplete
describe('My Second Test', () => {
    it('Another Test', () => {
      cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
      
      cy.get('#alertbtn').click()
      //Entweder id, class oder attribute selektor
      cy.get('[value="Confirm"]').click() 

      //window:alert (event) cypress auto accept alerts
      //-> Man sieht das nicht im Browser
      //cypress drückt automatisch auf OK

      //manually trigger the event
      //window:alert is the event which get fired on alert open
      cy.on('window:alert', (str) => {
        
        //mocha
        expect(str).to.equal('Hello , share this practice page and share your knowledge')
      }) //Das wird aufgerufen, wenn auf #alertbtn geklickt wurde

      //window:confirm
      //analog zu oben
      cy.on('window:confirm', (str) => {
        
        //mocha
        expect(str).to.equal('Hello , Are you sure you want to confirm?')
      })

    })
  })

  //Commands are Asynchronous, Commands are Promises