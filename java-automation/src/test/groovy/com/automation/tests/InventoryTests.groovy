package com.automation.tests

import com.automation.base.BaseTest
import com.automation.pages.LoginPage
import com.automation.pages.InventoryPage
import com.automation.data.TestData
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test

import static org.junit.jupiter.api.Assertions.*

@DisplayName("Inventory Tests - BDD Style")
class InventoryTests extends BaseTest {
    private LoginPage loginPage
    private InventoryPage inventoryPage

    @Override
    void setUp() {
        super.setUp()
        loginPage = new LoginPage(page)
        loginPage.goTo()
        loginPage.login(TestData.Users.STANDARD_USERNAME, TestData.Users.STANDARD_PASSWORD)
        inventoryPage = new InventoryPage(page)
    }

    @Test
    @DisplayName("Given I am logged in When I navigate to inventory Then I should see six products")
    void "shows six products"() {
        // Given - user is logged in and on inventory page
        // When - inventory page is loaded
        // Then
        inventoryPage.assertProductCount(6)
    }

    @Test
    @DisplayName("Given I am on the inventory page When I add a product to cart Then the cart badge should update")
    void "can add product to cart"() {
        // Given - user is on inventory page
        // When
        inventoryPage.addToCartByDataTest("add-to-cart-sauce-labs-backpack")
        // Then
        inventoryPage.assertCartBadgeCount(1)
    }
}
