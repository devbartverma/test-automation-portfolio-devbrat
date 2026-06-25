import pytest
from src.automation.pages.login_page import LoginPage
from src.automation.pages.inventory_page import InventoryPage
from src.automation.data.test_data import Users


class TestInventory:
    """Inventory test suite for product listing functionality."""

    @pytest.fixture(autouse=True)
    def setup(self, page):
        """
        Setup: Login before each inventory test.
        """
        login_page = LoginPage(page)
        login_page.go_to()
        login_page.login(Users.STANDARD_USERNAME, Users.STANDARD_PASSWORD)
        self.inventory_page = InventoryPage(page)

    def test_shows_six_products(self, page):
        """
        Given: I am logged in
        When: I navigate to inventory
        Then: I should see six products
        """
        # Given - user is logged in and on inventory page
        # When - inventory page is loaded
        # Then
        self.inventory_page.assert_product_count(6)

    def test_can_add_product_to_cart(self, page):
        """
        Given: I am on the inventory page
        When: I add a product to cart
        Then: the cart badge should update
        """
        # Given - user is on inventory page
        # When
        self.inventory_page.add_to_cart_by_data_test("add-to-cart-sauce-labs-backpack")

        # Then
        self.inventory_page.assert_cart_badge_count(1)
