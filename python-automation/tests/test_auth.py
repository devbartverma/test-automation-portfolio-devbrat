import pytest
from src.automation.pages.login_page import LoginPage
from src.automation.data.test_data import Users, ErrorMessages


class TestAuthentication:
    """Authentication test suite for login functionality."""

    def test_standard_user_can_login(self, page):
        """
        Given: I navigate to login page
        When: I login with valid credentials
        Then: I should be logged in successfully
        """
        # Given - page is already at login
        login_page = LoginPage(page)
        login_page.go_to()

        # When
        login_page.login(Users.STANDARD_USERNAME, Users.STANDARD_PASSWORD)

        # Then
        login_page.assert_logged_in()
        assert page.locator(".title").text_content() == "Products"

    def test_locked_out_user_shows_error(self, page):
        """
        Given: I navigate to login page
        When: I login with a locked out user
        Then: I should see a locked out error
        """
        # Given - page is already at login
        login_page = LoginPage(page)
        login_page.go_to()

        # When & Then
        login_page.login_and_expect_error(
            Users.LOCKED_USERNAME,
            Users.LOCKED_PASSWORD,
            ErrorMessages.LOCKED_OUT
        )

    def test_invalid_credentials_show_error(self, page):
        """
        Given: I navigate to login page
        When: I login with invalid credentials
        Then: I should see an invalid credentials error
        """
        # Given - page is already at login
        login_page = LoginPage(page)
        login_page.go_to()

        # When & Then
        login_page.login_and_expect_error(
            Users.INVALID_USERNAME,
            Users.INVALID_PASSWORD,
            ErrorMessages.INVALID_CREDENTIALS
        )
