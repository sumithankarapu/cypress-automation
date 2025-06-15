import { orCart } from "./or/shopping.or";

export default class Cart {
    /**
     * @details - To validate the items in cart  
     */
    validateCart(name){
        cy.get(orCart.miniCart)
            .scrollIntoView()
            .should('be.visible')
            .click();
        cy.get(orCart.itemName).should("contain.text", name);
    }
    
    /**
     * @details - To Delete the items from the cart  
     */
    deleteFromCart(){
        cy.get(orCart.delete).click();
        cy.get(orCart.modelWindow).should('be.visible'); 
        cy.get(orCart.okButton).click(); 
    }
}