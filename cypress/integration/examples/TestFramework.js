/// <reference types="Cypress" />
//für autocomplete

import HomePage from '../../support/pageObjects/HomePage'

describe('Framework Test', () => {

    //Design Pattern 1
    //Fetch Data from Fixture
    before(function() {
        //runs once before all tests in the block
        // fixtures/example.json
        cy.fixture('example').then(function(data) {
            this.data = data //this data = Global
            //this.data bekommt die Daten vom example.json
        })
    })
    //Arrow Funktionen funktionieren mit this nicht
    //If you store and access the fixture data using this test context object, 
    //make sure to use function () { ... } callbacks. 
    //Otherwise the test engine will NOT have this pointing at the test context.
    it('Fetch Data from Fixture', function() {
        const homePage = new HomePage()
     
        //url in env (key) definiert in cypress.json
        cy.visit(Cypress.env('url')+"angularpractice/") 

        //Design Pattern 3
        //Funktionen auslagern
        homePage.getEditBox().type(this.data.name)
        homePage.getGender().select(this.data.gender)
        //check if the two-way binding field also have the name 'bob'
        homePage.getTwoWayDataBinding().should('have.value', this.data.name)
        //checken ob minLength korrekt ist
        homePage.getEditBox().should('have.attr', 'minlength', '2')
        homePage.getEntrepreneur().should('be.disabled')
        
        //cy.pause()
        Cypress.config('defaultCommandTimeout', 8000)
        //Shop
        homePage.getShopTab().click()

        this.data.productName.forEach(function(element) {
            cy.selectProduct(element)
        })
        //Design Pattern 2
        //"Mixin" benutzen
        //Custom Method in support/command.js
        cy.selectProduct('Samsung Note 8')

        //Checkout

        cy.get('#navbarResponsive > .navbar-nav > .nav-item > .nav-link').click()

        let sum = 0;
        cy.get('tr td:nth-child(4) > strong').each(($el, index, $list) => {

            sum += (parseInt($el.text().substring(3)))

        })
        cy.get('h3 > strong').invoke('text')
            .then((text) => {
                const totalAsNumber = parseInt(text.substring(3))
                expect(totalAsNumber).to.equal(sum)
        })

        cy.contains('Checkout').click()
        cy.get('#country').type('India')
        cy.get('.suggestions > ul > li > a').click()
        cy.get('#checkbox2').click({force: true})
        cy.get('input[type="submit"]').click()
        //cy.get('.alert').should('have.text', "Success! Thank you! Your order will be delivered in next few weeks :-).")
        cy.get('.alert').then(function(element) {
            const actualText = element.text()
            expect(actualText.includes("Success")).to.be.true
        })
    })
  })

  //Commands are Asynchronous, Commands are Promises