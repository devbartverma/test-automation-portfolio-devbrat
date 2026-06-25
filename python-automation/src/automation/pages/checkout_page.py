from playwright.sync_api import Page
from src.automation.data.test_data import Urls


class CheckoutPage:
    def __init__(self, page: Page):
        self.page = page

    @property
    def first_name_input(self):
        return self.page.locator("[data-test='firstName']")

    @property
    def last_name_input(self):
        return self.page.locator("[data-test='lastName']")

    @property
    def postal_code_input(self):
        return self.page.locator("[data-test='postalCode']")

    @property
    def continue_button(self):
        return self.page.locator("[data-test='continue']")

    @property
    def finish_button(self):
        return self.page.locator("[data-test='finish']")

    @property
    def error_message(self):
        return self.page.locator("[data-test='error']")

    @property
    def complete_header(self):
        return self.page.locator("[data-test='complete-header']")

    def fill_customer_info(self, first_name: str, last_name: str, postal_code: str):
        self.first_name_input.fill(first_name)
        self.last_name_input.fill(last_name)
        self.postal_code_input.fill(postal_code)

    def continue_checkout(self):
        self.continue_button.click()

    def finish_order(self):
        self.finish_button.click()
        assert self.page.url == Urls.CHECKOUT_COMPLETE, \
            f"User should be redirected to {Urls.CHECKOUT_COMPLETE}, but got {self.page.url}"

    def assert_step1_error(self, expected_text: str):
        error_text = self.error_message.text_content()
        assert expected_text in error_text, \
            f"Error message should contain: {expected_text}, but got {error_text}"
