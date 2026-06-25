package com.automation.pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.automation.data.TestData;

import static org.junit.jupiter.api.Assertions.*;

public class ProductDetailPage {
    private final Page page;

    public ProductDetailPage(Page page) {
        this.page = page;
    }

    private Locator getProductName() {
        return page.locator(".inventory_details_name");
    }

    private Locator getProductPrice() {
        return page.locator(".inventory_details_price");
    }

    private Locator getProductDescription() {
        return page.locator(".inventory_details_desc");
    }

    private Locator getAddToCartButton() {
        return page.locator("[data-test='add-to-cart']");
    }

    private Locator getBackButton() {
        return page.locator("[data-test='back-to-products']");
    }

    public void assertProductDetail(String expectedName, String expectedPrice) {
        assertEquals(expectedName, getProductName().textContent(), 
            "Product name should match");
        assertEquals(expectedPrice, getProductPrice().textContent(), 
            "Product price should match");
        assertTrue(getProductDescription().isVisible(), 
            "Product description should be visible");
    }

    public void addToCart() {
        getAddToCartButton().click();
    }

    public void backToProducts() {
        getBackButton().click();
        assertEquals(TestData.Urls.INVENTORY, page.url(), 
            "User should be redirected to inventory page");
    }
}
