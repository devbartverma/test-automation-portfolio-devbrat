from playwright.sync_api import Page
from src.automation.data.test_data import Urls


class CartPage:
    def __init__(self, page: Page):
        self.page = page

    @property
    def item_names(self):
        return self.page.locator(".inventory_item_name")

    @property
    def checkout_button(self):
        return self.page.locator("[data-test='checkout']")

    @property
    def continue_shopping_button(self):
        return self.page.locator("[data-test='continue-shopping']")

    def go_to(self):
        self.page.goto(Urls.CART)
        assert self.page.url == Urls.CART, \
            f"User should be on {Urls.CART}, but got {self.page.url}"

    def assert_item_in_cart(self, product_name: str):
        items = self.page.locator(".inventory_item_name", has_text=product_name)
        count = items.count()
        assert count > 0, f"Product '{product_name}' should be in cart"

    def proceed_to_checkout(self):
        self.checkout_button.click()
        assert self.page.url == Urls.CHECKOUT_STEP_1, \
            f"User should be redirected to {Urls.CHECKOUT_STEP_1}, but got {self.page.url}"

    def continue_shopping(self):
        self.continue_shopping_button.click()
        assert self.page.url == Urls.INVENTORY, \
            f"User should be redirected to {Urls.INVENTORY}, but got {self.page.url}"
