import pytest
from src.automation.pages.login_page import LoginPage
from src.automation.pages.inventory_page import InventoryPage
from src.automation.pages.cart_page import CartPage
from src.automation.pages.checkout_page import CheckoutPage
from src.automation.data.test_data import Users, CustomerData, Urls
from src.automation.data.product_data import Products


class TestCheckout:
    """Checkout test suite for purchase completion flow."""

    @pytest.fixture(autouse=True)
    def setup(self, page):
        """
        Setup: Login and navigate to inventory before each checkout test.
        """
        login_page = LoginPage(page)
        login_page.go_to()
        login_page.login(Users.STANDARD_USERNAME, Users.STANDARD_PASSWORD)
        self.inventory_page = InventoryPage(page)
        self.page = page

    def test_checkout_with_one_item_completes_successfully(self, page):
        """
        Given: I am on inventory page
        When: I add a product and complete checkout
        Then: order should be placed successfully
        """
        # Given
        self.inventory_page.add_to_cart_by_data_test(Products.BACKPACK_ADD_TO_CART)
        self.inventory_page.go_to_cart()

        # When
        cart_page = CartPage(page)
        cart_page.proceed_to_checkout()

        checkout_page = CheckoutPage(page)
        checkout_page.fill_customer_info(
            CustomerData.FIRST_NAME,
            CustomerData.LAST_NAME,
            CustomerData.POSTAL_CODE
        )
        checkout_page.continue_checkout()

        # Then
        assert page.url == Urls.CHECKOUT_STEP_2
        checkout_page.finish_order()
        assert checkout_page.complete_header.text_content() == "Thank you for your order!"

    def test_checkout_validation_shows_first_name_error(self, page):
        """
        Given: I am on checkout page
        When: I try to proceed without entering first name
        Then: I should see a validation error
        """
        # Given
        self.inventory_page.add_to_cart_by_data_test(Products.BACKPACK_ADD_TO_CART)
        self.inventory_page.go_to_cart()

        # When
        cart_page = CartPage(page)
        cart_page.proceed_to_checkout()

        checkout_page = CheckoutPage(page)
        checkout_page.continue_checkout()

        # Then
        checkout_page.assert_step1_error("Error: First Name is required")
