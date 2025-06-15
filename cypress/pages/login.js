import { orLoginPage } from "./or/shopping.or"

export default class LoginPage {

    /**
     * @details - To validate the login 
     */
    validateLogin(userDetails){
        this.enterCredentialsAndLogin(userDetails);
        cy.title().should('eq', 'My Account');    
    }

    /**
     * @details - To validate the invalid Login 
     */
    validateInvalidLogin(userDetails){
        const errorText = 'The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.'

        this.enterCredentialsAndLogin(userDetails);
        cy.get('[data-ui-id="message-error"]').should('be.visible').and('contain', errorText);
    }

    /**
     * @details - To Enter the credentails and click sign in button
     */
    enterCredentialsAndLogin(userDetails){
        const {email, password} = userDetails;

        cy.cType(orLoginPage.email, email);
        cy.cType(orLoginPage.password, password);
        cy.contains(orLoginPage.button, 'Sign In').click();
    }
}
