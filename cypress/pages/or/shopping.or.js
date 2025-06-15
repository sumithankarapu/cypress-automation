export const orLoginPage = {
    email: '#email',
    password: '#pass',
    button: 'button'
}

export const orMenJackets = {
    menuItem: 'a[role="menuitem"]',
    uiItem: '.ui-menu-icon',
    navigator: '.nav-3',
    filterOption: '.filter-options-title',
    hidden: '[aria-hidden="false"]',
    filterContent: '.filter-options-content',
    optionLink: '.swatch-option-link-layered',
    productItem: '.product-item-name',
    addCart: '#product-addtocart-button',
    span: 'span',
    getAriaLabel: (x) => `[aria-label='${x}']`
}

export const orCart = {
   miniCart: '.minicart-wrapper',
   itemName: '.product-item-name a',
   delete: '.delete',
   okButton: 'button.action-primary.action-accept',
   modelWindow: '.modal-inner-wrap'
}