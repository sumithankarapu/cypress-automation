import { tdInValidUser, tdValidUser, tdmenJackets } from "../../fixtures/ui-automation/task1.td";

import MenJackets from "../../pages/men-jackets";
import LoginPage from "../../pages/login";
import Cart from "../../pages/cart";

describe('To Validate the Login and Navigation Men >> tops >> jackets', () => {
  const login = new LoginPage();
  const menJackets = new MenJackets();
  const cart = new Cart();

  it('To Validate incorrect login and validate login and add items to carts based on filter and delete it', () => {
    cy.visit('/customer/account/login/')

    login.validateInvalidLogin(tdInValidUser);
    login.validateLogin(tdValidUser);
    menJackets.navigateToJackets();
    menJackets.selectAndAddToCart(tdmenJackets);
    cart.validateCart(tdmenJackets.name);
    cart.deleteFromCart();
  })
})