import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

import { tdPetPayload,tdUpdatedPetPayload } from '../../fixtures/api-automation/task2.td';

Given('I create a new pet', () => {
  cy.request('POST', 'https://petstore.swagger.io/v2/pet', tdPetPayload)
    .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq('Buddy');
      Cypress.env('petId', response.body.id);
    });
});

When('I fetch the newly created pet by ID', () => {
  const petId = Cypress.env('petId');
  cy.log('Polling for petId: ' + petId);

  const fetchPetWithRetry = (retries = 10) => {
    if (retries === 0) {
      throw new Error('Pet not found after multiple retries');
    }

    cy.request({
      method: 'GET',
      url: `https://petstore.swagger.io/v2/pet/${petId}`,
      failOnStatusCode: false,
      headers: {
        accept: 'application/json'
      }
    }).then((response) => {
      if (response.status === 200) {
        cy.wrap(response).as('getPetResponse');
      } else {
        cy.wait(1000).then(() => fetchPetWithRetry(retries - 1));
      }
    });
  };

  fetchPetWithRetry();
});


Then('the response should contain the correct pet details', () => {
  cy.get('@getPetResponse').then((response) => {
    const petId = Cypress.env('petId');
    expect(response.status).to.eq(200);
    expect(response.body.id).to.eq(petId);
    expect(response.body.name).to.eq('Buddy');
  });
});

When('I update the pet details', () => {
  cy.request('PUT', 'https://petstore.swagger.io/v2/pet', tdUpdatedPetPayload)
    .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq('Max');
      expect(response.body.status).to.eq('sold');
    });
});

Then('the updated response should reflect new values', () => {
  const petId = Cypress.env('petId');

  const verifyUpdatedPet = (retries = 10) => {
    cy.request({
      method: 'GET',
      url: `https://petstore.swagger.io/v2/pet/${petId}`,
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 200 && response.body.name === 'Max' && response.body.status === 'sold') {
        expect(response.body.name).to.eq('Max');
        expect(response.body.status).to.eq('sold');
      } else if (retries > 0) {
        cy.wait(1000).then(() => verifyUpdatedPet(retries - 1));
      } else {
        throw new Error('Pet was not updated correctly within retry window');
      }
    });
  };

  verifyUpdatedPet();
});


When('I delete the pet', () => {
  const petId = Cypress.env('petId');

  cy.request('DELETE', `https://petstore.swagger.io/v2/pet/${petId}`)
    .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq(String(petId));
    });
});

Then('I should not be able to fetch the deleted pet', () => {
  const petId = Cypress.env('petId');

  const verifyPetDeleted = (retries = 10) => {
    cy.request({
      method: 'GET',
      url: `https://petstore.swagger.io/v2/pet/${petId}`,
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 404 && response.body.message === 'Pet not found') {
        expect(response.status).to.eq(404);
        expect(response.body.message).to.eq('Pet not found');
      } else if (retries > 0) {
        cy.wait(1000).then(() => verifyPetDeleted(retries - 1));
      } else {
        throw new Error('Pet was not deleted correctly within retry window');
      }
    });
  };

  verifyPetDeleted();
});

