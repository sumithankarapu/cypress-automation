import { orMenJackets } from "./or/shopping.or";

export default class MenJackets {

  /**
     * @details - To Navigate to Men >> Tops >> jackets
  */
  navigateToJackets(){
    cy.contains(orMenJackets.span, 'Men').parents(orMenJackets.navigator).within(()=>{
      cy.get(orMenJackets.uiItem).eq(0).trigger('mouseover');
      cy.contains(orMenJackets.menuItem, 'Tops').trigger('mouseover');
      cy.contains(orMenJackets.menuItem, 'Jackets').click();
    })
    cy.title().should('eq', 'Jackets - Tops - Men');
  }

  /**
     * @details - To select and add item to the cart
  */
  selectAndAddToCart(item){
    const {size, color} = item

    cy.contains(orMenJackets.filterOption, "Size").click()
    cy.get(orMenJackets.hidden).should('be.visible')
    cy.get(orMenJackets.filterContent).contains(orMenJackets.optionLink, size).within(()=>{
      cy.contains(orMenJackets.optionLink, size).scrollIntoView().click({force: true})
    })
    cy.get(orMenJackets.productItem).eq(0).click();
    cy.intercept('GET','**/media/catalog/product/**').as('cataLog')
    cy.cClick(orMenJackets.getAriaLabel(size))
    cy.wait('@cataLog')
    cy.cClick(orMenJackets.getAriaLabel(color))
    cy.intercept('POST', '**/checkout/cart/add/**').as('addToCart');
    cy.intercept('GET', '**/customer/section/load/**').as('loadCustomerSection');
    cy.cClick(orMenJackets.addCart);
    cy.wait(['@addToCart', '@loadCustomerSection']);
  }
}