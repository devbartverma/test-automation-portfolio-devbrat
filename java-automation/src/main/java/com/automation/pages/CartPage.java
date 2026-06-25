package com.automation.pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.automation.data.TestData;

import static org.junit.jupiter.api.Assertions.*;

public class CartPage {
    private final Page page;

    public CartPage(Page page) {
        this.page = page;
    }

    private Locator getItemNames() {
        return page.locator(".inventory_item_name");
    }

    private Locator getCheckoutButton() {
        return page.locator("[data-test='checkout']");
    }

    private Locator getContinueShoppingButton() {
        return page.locator("[data-test='continue-shopping']");
    }

    public void goTo() {
        page.navigate(TestData.Urls.CART);
        assertEquals(TestData.Urls.CART, page.url(), "User should be on cart page");
    }

    public void assertItemInCart(String productName) {
        Locator items = page.locator(".inventory_item_name", new Page.LocatorOptions().setHasText(productName));
        assertTrue(items.count() > 0, "Product '" + productName + "' should be in cart");
    }

    public void proceedToCheckout() {
        getCheckoutButton().click();
        assertEquals(TestData.Urls.CHECKOUT_STEP_1, page.url(), 
            "User should be redirected to checkout step 1");
    }

    public void continueShopping() {
        getContinueShoppingButton().click();
        assertEquals(TestData.Urls.INVENTORY, page.url(), 
            "User should be redirected to inventory page");
    }
}
