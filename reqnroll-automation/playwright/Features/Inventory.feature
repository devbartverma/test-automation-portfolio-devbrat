@ui
Feature: Inventory
  As a shopper
  I want to browse and sort products
  So that I can find what I want

  Background:
    Given I am logged in as the standard user

  Scenario: Inventory shows six products
    Then I should see 6 products

  Scenario: Sort products by price high to low
    When I sort the products by price, high to low
    Then the product prices should be in descending order

  Scenario: Sort products by name A to Z
    When I sort the products by name, A to Z
    Then the product names should be in ascending order

  Scenario: Open a product detail page
    When I open the detail page for "Sauce Labs Backpack"
    Then the detail page shows "Sauce Labs Backpack" priced "$29.99"
