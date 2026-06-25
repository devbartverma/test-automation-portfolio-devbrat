package com.automation.tests

import com.automation.base.BaseTest
import com.automation.pages.LoginPage
import com.automation.pages.InventoryPage
import com.automation.pages.CartPage
import com.automation.pages.CheckoutPage
import com.automation.data.TestData
import com.automation.data.ProductData
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test

import static org.junit.jupiter.api.Assertions.*

@DisplayName("Checkout Tests - BDD Style")
class CheckoutTests extends BaseTest {
    private LoginPage loginPage
    private InventoryPage inventoryPage
    private CartPage cartPage
    private CheckoutPage checkoutPage

    @Override
    void setUp() {
        super.setUp()
        loginPage = new LoginPage(page)
        loginPage.goTo()
        loginPage.login(TestData.Users.STANDARD_USERNAME, TestData.Users.STANDARD_PASSWORD)
        inventoryPage = new InventoryPage(page)
    }

    @Test
    @DisplayName("Given I am on inventory page When I add a product and complete checkout Then order should be placed successfully")
    void "checkout with one item completes successfully"() {
        // Given
        inventoryPage.addToCartByDataTest(ProductData.Products.BACKPACK_ADD_TO_CART)
        inventoryPage.goToCart()

        // When
        cartPage = new CartPage(page)
        cartPage.proceedToCheckout()

        checkoutPage = new CheckoutPage(page)
        checkoutPage.fillCustomerInfo(TestData.CustomerData.FIRST_NAME, TestData.CustomerData.LAST_NAME, 
            TestData.CustomerData.POSTAL_CODE)
        checkoutPage.continueCheckout()

        // Then
        assertEquals(TestData.Urls.CHECKOUT_STEP_2, page.url(), 
            "User should be on checkout step 2")
        checkoutPage.finishOrder()
        assertEquals("Thank you for your order!", checkoutPage.completeHeader.textContent(), 
            "Completion message should be displayed")
    }

    @Test
    @DisplayName("Given I am on checkout page When I try to proceed without entering first name Then I should see a validation error")
    void "checkout validation shows first name error"() {
        // Given
        inventoryPage.addToCartByDataTest(ProductData.Products.BACKPACK_ADD_TO_CART)
        inventoryPage.goToCart()

        // When
        cartPage = new CartPage(page)
        cartPage.proceedToCheckout()

        checkoutPage = new CheckoutPage(page)
        checkoutPage.continueCheckout()

        // Then
        checkoutPage.assertStep1Error("Error: First Name is required")
    }
}
