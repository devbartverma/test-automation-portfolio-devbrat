package com.automation.pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.automation.data.TestData;

import static org.junit.jupiter.api.Assertions.*;

public class InventoryPage {
    private final Page page;

    public InventoryPage(Page page) {
        this.page = page;
    }

    private Locator getProductNames() {
        return page.locator(".inventory_item_name");
    }

    private Locator getProductPrices() {
        return page.locator(".inventory_item_price");
    }

    private Locator getCartBadge() {
        return page.locator(".shopping_cart_badge");
    }

    private Locator getCartLink() {
        return page.locator(".shopping_cart_link");
    }

    private Locator getSortDropdown() {
        return page.locator("[data-test='product-sort-container']");
    }

    public void goTo() {
        page.navigate(TestData.Urls.INVENTORY);
    }

    public void addToCartByDataTest(String dataTestId) {
        page.locator("[data-test='" + dataTestId + "']").click();
    }

    public void goToCart() {
        getCartLink().click();
        assertEquals(TestData.Urls.CART, page.url(), "User should be redirected to cart page");
    }

    public void assertProductCount(int expected) {
        assertEquals(expected, getProductNames().count(), 
            "Expected " + expected + " products but found " + getProductNames().count());
    }

    public void assertCartBadgeCount(int expected) {
        assertEquals(String.valueOf(expected), getCartBadge().textContent(), 
            "Cart badge should show " + expected + " items");
    }

    public void selectSort(String option) {
        getSortDropdown().selectOption(option);
    }
}
