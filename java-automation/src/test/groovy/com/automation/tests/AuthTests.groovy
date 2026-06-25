package com.automation.tests

import com.automation.base.BaseTest
import com.automation.pages.LoginPage
import com.automation.data.TestData
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test

import static org.junit.jupiter.api.Assertions.*

@DisplayName("Authentication Tests - BDD Style")
class AuthTests extends BaseTest {
    private LoginPage loginPage

    @Override
    void setUp() {
        super.setUp()
        loginPage = new LoginPage(page)
        loginPage.goTo()
    }

    @Test
    @DisplayName("Given I navigate to login page When I login with valid credentials Then I should be logged in successfully")
    void "standard user can login"() {
        // Given - page is already at login
        // When
        loginPage.login(TestData.Users.STANDARD_USERNAME, TestData.Users.STANDARD_PASSWORD)
        // Then
        loginPage.assertLoggedIn()
        assertTrue(page.locator(".title").textContent().contains("Products"), 
            "Products title should be displayed")
    }

    @Test
    @DisplayName("Given I navigate to login page When I login with a locked out user Then I should see a locked out error")
    void "locked out user shows error"() {
        // Given - page is already at login
        // When & Then
        loginPage.loginAndExpectError(TestData.Users.LOCKED_USERNAME, TestData.Users.LOCKED_PASSWORD, 
            TestData.ErrorMessages.LOCKED_OUT)
    }

    @Test
    @DisplayName("Given I navigate to login page When I login with invalid credentials Then I should see an invalid credentials error")
    void "invalid credentials show error"() {
        // Given - page is already at login
        // When & Then
        loginPage.loginAndExpectError(TestData.Users.INVALID_USERNAME, TestData.Users.INVALID_PASSWORD, 
            TestData.ErrorMessages.INVALID_CREDENTIALS)
    }
}
