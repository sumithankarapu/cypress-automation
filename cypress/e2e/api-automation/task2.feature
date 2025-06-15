Feature: CRUD Operations on Pet API

  Scenario: Create, read, update, and delete a pet
    Given I create a new pet
    When I fetch the newly created pet by ID
    Then the response should contain the correct pet details
    When I update the pet details
    Then the updated response should reflect new values
    When I delete the pet
    Then I should not be able to fetch the deleted pet