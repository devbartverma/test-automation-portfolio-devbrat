@ui
Feature: Shopping Cart
  As a shopper
  I want to manage items in my cart
  So that I buy exactly what I intend to

  Background:
    Given I am logged in as the standard user

  Scenario: Added items appear in the cart
    When I add the "Sauce Labs Fleece Jacket" and "Sauce Labs Backpack" to the cart
    And I open the cart
    Then the cart contains "Sauce Labs Fleece Jacket" and "Sauce Labs Backpack"
    And the cart has 2 items

  Scenario: Removing an item updates the count
    When I add the "Sauce Labs Backpack" and "Sauce Labs Bike Light" to the cart
    And I open the cart
    And I remove "Sauce Labs Backpack" from the cart
    Then the cart has 1 item
    And the cart badge shows "1"

  Scenario: Cart persists after returning to shopping
    When I add the "Sauce Labs Backpack" to the cart
    And I open the cart
    And I continue shopping
    Then the cart badge shows "1"
