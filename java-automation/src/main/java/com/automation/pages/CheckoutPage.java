package com.automation.pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.automation.data.TestData;

import static org.junit.jupiter.api.Assertions.*;

public class CheckoutPage {
    private final Page page;

    public CheckoutPage(Page page) {
        this.page = page;
    }

    private Locator getFirstNameInput() {
        return page.locator("[data-test='firstName']");
    }

    private Locator getLastNameInput() {
        return page.locator("[data-test='lastName']");
    }

    private Locator getPostalCodeInput() {
        return page.locator("[data-test='postalCode']");
    }

    private Locator getContinueButton() {
        return page.locator("[data-test='continue']");
    }

    private Locator getFinishButton() {
        return page.locator("[data-test='finish']");
    }

    private Locator getErrorMessage() {
        return page.locator("[data-test='error']");
    }

    public Locator getCompleteHeader() {
        return page.locator("[data-test='complete-header']");
    }

    public void fillCustomerInfo(String firstName, String lastName, String postalCode) {
        getFirstNameInput().fill(firstName);
        getLastNameInput().fill(lastName);
        getPostalCodeInput().fill(postalCode);
    }

    public void continueCheckout() {
        getContinueButton().click();
    }

    public void finishOrder() {
        getFinishButton().click();
        assertEquals(TestData.Urls.CHECKOUT_COMPLETE, page.url(), 
            "User should be redirected to checkout complete page");
    }

    public void assertStep1Error(String expectedText) {
        assertTrue(getErrorMessage().textContent().contains(expectedText), 
            "Error message should contain: " + expectedText);
    }
}
