import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { InventoryPage } from '../Pages/InventoryPage';
import { PRODUCTS, SORT_OPTIONS, USERS } from '../data/testData';

test.describe('Inventory / Product Listing', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    inventoryPage = new InventoryPage(page);
  });

  test('shows six inventory products', async () => {
    await inventoryPage.assertProductCount(6);
  });

  test('shows product names, prices, and add buttons', async ({ page }) => {
    const names = await inventoryPage.productNames().allTextContents();
    const prices = await inventoryPage.productPrices().allTextContents();
    const buttons = page.locator('[data-test^="add-to-cart"]');

    expect(names).toHaveLength(6);
    expect(prices).toHaveLength(6);
    await expect(buttons).toHaveCount(6);

    prices.forEach(p => {
      const value = parseFloat(p.replace('$', ''));
      expect(value).toBeGreaterThan(0);
    });
  });

  test('sorts products by price high to low', async () => {
    await inventoryPage.sortBy(SORT_OPTIONS.priceHiLo);
    const prices = await inventoryPage.assertPricesSortedDescending();
    expect(prices[0]).toBeGreaterThan(prices[prices.length - 1]);
  });

  test('sorts products by price low to high', async () => {
    await inventoryPage.sortBy(SORT_OPTIONS.priceLoHi);
    const prices = await inventoryPage.assertPricesSortedAscending();
    expect(prices[0]).toBeLessThan(prices[prices.length - 1]);
  });

  test('sorts products by name A to Z', async () => {
    await inventoryPage.sortBy(SORT_OPTIONS.nameAZ);
    await inventoryPage.assertNamesAlphabeticallyAscending();
  });

  test('sorts products by name Z to A', async () => {
    await inventoryPage.sortBy(SORT_OPTIONS.nameZA);
    await inventoryPage.assertNamesAlphabeticallyDescending();
  });

  test('retains sort order after adding item to cart', async () => {
    await inventoryPage.sortBy(SORT_OPTIONS.priceHiLo);
    await inventoryPage.addToCartByDataTest(PRODUCTS.backpack.dataTest);
    await inventoryPage.assertPricesSortedDescending();
  });

  test('opens product detail page for Sauce Labs Backpack', async ({ page }) => {
    await inventoryPage.openProductDetail(PRODUCTS.backpack.name);

    await expect(page.locator('.inventory_details_name')).toHaveText(PRODUCTS.backpack.name);
    await expect(page.locator('.inventory_details_price')).toHaveText(`$${PRODUCTS.backpack.price}`);
    await expect(page.locator('.inventory_details_desc')).not.toBeEmpty();
    await expect(page.getByTestId('back-to-products')).toBeVisible();
  });

  test('adds item from product detail page and updates badge', async ({ page }) => {
    await inventoryPage.openProductDetail(PRODUCTS.backpack.name);
    await page.getByTestId('add-to-cart').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('resets app state via burger menu and clears cart badge', async () => {
    await inventoryPage.addMultipleToCart([
      PRODUCTS.backpack.dataTest,
      PRODUCTS.bikeLight.dataTest,
    ]);
    await inventoryPage.assertCartBadgeCount(2);
    await inventoryPage.resetAppState();
    await inventoryPage.assertCartBadgeNotVisible();
  });
});
