@ui
Feature: Checkout
  As a shopper
  I want a correct, validated checkout
  So that I am charged the right amount

  Background:
    Given I am logged in as the standard user

  Scenario: First name is required
    Given I have the "Sauce Labs Backpack" in the cart and I am on checkout step one
    When I submit the form without a first name
    Then I should see the error "Error: First Name is required"

  Scenario: Subtotal matches a single item price
    Given I have the "Sauce Labs Backpack" in the cart and I am on checkout step one
    When I fill the customer info and continue
    Then the subtotal should be "29.99"

  Scenario: Subtotal plus tax equals the total
    Given I have the "Sauce Labs Fleece Jacket" and "Sauce Labs Backpack" in the cart and I am on checkout step one
    When I fill the customer info and continue
    Then subtotal plus tax should equal the total

  Scenario: Complete a two-item checkout end to end
    When I sort the products by price, high to low
    And I add the "Sauce Labs Fleece Jacket" and "Sauce Labs Backpack" to the cart
    And I open the cart
    And I proceed to checkout
    And I fill the customer info and continue
    And I finish the order
    Then I should see the order confirmation
