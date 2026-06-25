from playwright.sync_api import Page
from src.automation.data.test_data import Urls


class ProductDetailPage:
    def __init__(self, page: Page):
        self.page = page

    @property
    def product_name(self):
        return self.page.locator(".inventory_details_name")

    @property
    def product_price(self):
        return self.page.locator(".inventory_details_price")

    @property
    def product_description(self):
        return self.page.locator(".inventory_details_desc")

    @property
    def add_to_cart_button(self):
        return self.page.locator("[data-test='add-to-cart']")

    @property
    def back_button(self):
        return self.page.locator("[data-test='back-to-products']")

    def assert_product_detail(self, expected_name: str, expected_price: str):
        actual_name = self.product_name.text_content()
        actual_price = self.product_price.text_content()

        assert actual_name == expected_name, \
            f"Product name should be '{expected_name}' but got '{actual_name}'"
        assert actual_price == expected_price, \
            f"Product price should be '{expected_price}' but got '{actual_price}'"
        assert self.product_description.is_visible(), \
            "Product description should be visible"

    def add_to_cart(self):
        self.add_to_cart_button.click()

    def back_to_products(self):
        self.back_button.click()
        assert self.page.url == Urls.INVENTORY, \
            f"User should be redirected to {Urls.INVENTORY}, but got {self.page.url}"
