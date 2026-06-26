@ui
Feature: Authentication
  As a shopper
  I want login to behave correctly
  So that only valid users reach the store

  Background:
    Given I am on the login page

  Scenario: Standard user can log in
    When I log in as the standard user
    Then I should land on the inventory page
    And the page title should be "Products"

  Scenario: Locked-out user sees an error with icon
    When I log in as the locked-out user
    Then I should see the locked-out error with its icon

  Scenario: Invalid credentials are rejected
    When I log in with invalid credentials
    Then I should see the invalid-credentials error

  Scenario: Logout blocks direct access to the inventory
    When I log in as the standard user
    And I log out
    And I try to open the inventory directly
    Then I should be redirected to the login page
