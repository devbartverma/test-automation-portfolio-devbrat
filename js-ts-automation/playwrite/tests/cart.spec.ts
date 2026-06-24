import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { InventoryPage } from '../Pages/InventoryPage';
import { CartPage } from '../Pages/CartPage';
import { PRODUCTS, USERS } from '../data/testData';

test.describe('Shopping Cart', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
  });

  test('updates badge to 1 after adding one item', async () => {
    await inventoryPage.addToCartByDataTest(PRODUCTS.backpack.dataTest);
    await inventoryPage.assertCartBadgeCount(1);
  });

  test('updates badge to 2 after adding two items', async () => {
    await inventoryPage.addMultipleToCart([
      PRODUCTS.backpack.dataTest,
      PRODUCTS.bikeLight.dataTest,
    ]);
    await inventoryPage.assertCartBadgeCount(2);
  });

  test('shows badge count of 6 after adding all products', async () => {
    await inventoryPage.addMultipleToCart(
      Object.values(PRODUCTS).map(product => product.dataTest)
    );
    await inventoryPage.assertCartBadgeCount(6);
  });

  test('shows added items in cart with correct names', async () => {
    await inventoryPage.addMultipleToCart([
      PRODUCTS.fleeceJacket.dataTest,
      PRODUCTS.backpack.dataTest,
    ]);
    await inventoryPage.goToCart();

    await cartPage.assertItemInCart(PRODUCTS.fleeceJacket.name);
    await cartPage.assertItemInCart(PRODUCTS.backpack.name);
    await cartPage.assertItemCount(2);
  });

  test('shows correct item prices in cart', async () => {
    await inventoryPage.addMultipleToCart([
      PRODUCTS.backpack.dataTest,
      PRODUCTS.bikeLight.dataTest,
    ]);
    await inventoryPage.goToCart();

    const prices = await cartPage.getCartPrices();
    expect(prices).toContain(PRODUCTS.backpack.price);
    expect(prices).toContain(PRODUCTS.bikeLight.price);
  });

  test('removes item from cart and updates count', async () => {
    await inventoryPage.addMultipleToCart([
      PRODUCTS.backpack.dataTest,
      PRODUCTS.bikeLight.dataTest,
    ]);
    await inventoryPage.goToCart();

    await cartPage.removeItem(PRODUCTS.backpack.name);

    await cartPage.assertItemNotInCart(PRODUCTS.backpack.name);
    await cartPage.assertItemCount(1);
    await expect(cartPage.page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('shows empty cart after removing all items', async () => {
    await inventoryPage.addToCartByDataTest(PRODUCTS.backpack.dataTest);
    await inventoryPage.goToCart();
    await cartPage.removeItem(PRODUCTS.backpack.name);
    await cartPage.assertCartIsEmpty();
  });

  test('removes inventory item using remove button and clears badge', async () => {
    await inventoryPage.addToCartByDataTest(PRODUCTS.backpack.dataTest);
    await inventoryPage.assertCartBadgeCount(1);
    await inventoryPage.removeFromCartByDataTest('remove-sauce-labs-backpack');
    await inventoryPage.assertCartBadgeNotVisible();
  });

  test('preserves cart contents after returning from cart', async () => {
    await inventoryPage.addToCartByDataTest(PRODUCTS.backpack.dataTest);
    await inventoryPage.goToCart();
    await cartPage.continueShopping();
    await inventoryPage.assertCartBadgeCount(1);
  });

  test('preserves cart after sorting inventory', async () => {
    await inventoryPage.addToCartByDataTest(PRODUCTS.backpack.dataTest);
    await inventoryPage.sortBy('hilo');
    await inventoryPage.assertCartBadgeCount(1);
  });
});


