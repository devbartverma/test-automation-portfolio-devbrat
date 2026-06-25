from playwright.sync_api import Page
from src.automation.data.test_data import Urls


class InventoryPage:
    def __init__(self, page: Page):
        self.page = page

    @property
    def product_names(self):
        return self.page.locator(".inventory_item_name")

    @property
    def product_prices(self):
        return self.page.locator(".inventory_item_price")

    @property
    def cart_badge(self):
        return self.page.locator(".shopping_cart_badge")

    @property
    def cart_link(self):
        return self.page.locator(".shopping_cart_link")

    @property
    def sort_dropdown(self):
        return self.page.locator("[data-test='product-sort-container']")

    def go_to(self):
        self.page.goto(Urls.INVENTORY)

    def add_to_cart_by_data_test(self, data_test_id: str):
        self.page.locator(f"[data-test='{data_test_id}']").click()

    def go_to_cart(self):
        self.cart_link.click()
        assert self.page.url == Urls.CART, \
            f"User should be redirected to {Urls.CART}, but got {self.page.url}"

    def assert_product_count(self, expected: int):
        count = self.product_names.count()
        assert count == expected, \
            f"Expected {expected} products but found {count}"

    def assert_cart_badge_count(self, expected: int):
        badge_text = self.cart_badge.text_content()
        assert badge_text == str(expected), \
            f"Cart badge should show {expected} items but shows {badge_text}"

    def select_sort(self, option: str):
        self.sort_dropdown.select_option(option)
