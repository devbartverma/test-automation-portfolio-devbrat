import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { InventoryPage } from '../Pages/InventoryPage';
import { CartPage } from '../Pages/CartPage';
import { CheckoutPage } from '../Pages/CheckoutPage';
import { CUSTOMER, ERROR_MESSAGES, PRODUCTS, USERS } from '../data/testData';

async function loginAndAddItems(
  page: import('@playwright/test').Page,
  productDataTestIds: string[]
): Promise<{ inventoryPage: InventoryPage; cartPage: CartPage; checkoutPage: CheckoutPage }> {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(USERS.standard.username, USERS.standard.password);

  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addMultipleToCart(productDataTestIds);
  await inventoryPage.goToCart();

  const cartPage = new CartPage(page);
  await cartPage.proceedToCheckout();

  const checkoutPage = new CheckoutPage(page);
  return { inventoryPage, cartPage, checkoutPage };
}

test.describe('Checkout Flow', () => {
  test.describe('Customer information validation', () => {
    test('shows first name required error', async ({ page }) => {
      const { checkoutPage } = await loginAndAddItems(page, [PRODUCTS.backpack.dataTest]);
      await checkoutPage.fillCustomerInfo({ firstName: '', lastName: CUSTOMER.lastName, postalCode: CUSTOMER.postalCode });
      await checkoutPage.submitEmptyForm();
      await checkoutPage.assertStep1Error(ERROR_MESSAGES.missingFirstName);
    });

    test('shows last name required error', async ({ page }) => {
      const { checkoutPage } = await loginAndAddItems(page, [PRODUCTS.backpack.dataTest]);
      await checkoutPage.fillCustomerInfo({ firstName: CUSTOMER.firstName, lastName: '', postalCode: CUSTOMER.postalCode });
      await checkoutPage.submitEmptyForm();
      await checkoutPage.assertStep1Error(ERROR_MESSAGES.missingLastName);
    });

    test('shows postal code required error', async ({ page }) => {
      const { checkoutPage } = await loginAndAddItems(page, [PRODUCTS.backpack.dataTest]);
      await checkoutPage.fillCustomerInfo({ firstName: CUSTOMER.firstName, lastName: CUSTOMER.lastName, postalCode: '' });
      await checkoutPage.submitEmptyForm();
      await checkoutPage.assertStep1Error(ERROR_MESSAGES.missingPostalCode);
    });

    test('does not proceed when checkout fields are empty', async ({ page }) => {
      const { checkoutPage } = await loginAndAddItems(page, [PRODUCTS.backpack.dataTest]);
      await checkoutPage.submitEmptyForm();
      await expect(page).toHaveURL(/checkout-step-one/);
    });
  });

  test.describe('Order overview and pricing', () => {
    test('shows correct subtotal for one item', async ({ page }) => {
      const { checkoutPage } = await loginAndAddItems(page, [PRODUCTS.backpack.dataTest]);
      await checkoutPage.fillAndContinue(CUSTOMER);

      const { subtotal } = await checkoutPage.getPriceSummary();
      expect(subtotal).toBeCloseTo(PRODUCTS.backpack.price, 2);
    });

    test('shows correct subtotal for two items', async ({ page }) => {
      const { checkoutPage } = await loginAndAddItems(page, [
        PRODUCTS.backpack.dataTest,
        PRODUCTS.bikeLight.dataTest,
      ]);
      await checkoutPage.fillAndContinue(CUSTOMER);

      const { subtotal } = await checkoutPage.getPriceSummary();
      expect(subtotal).toBeCloseTo(PRODUCTS.backpack.price + PRODUCTS.bikeLight.price, 2);
    });

    test('verifies subtotal plus tax equals total', async ({ page }) => {
      const { checkoutPage } = await loginAndAddItems(page, [
        PRODUCTS.fleeceJacket.dataTest,
        PRODUCTS.backpack.dataTest,
      ]);
      await checkoutPage.fillAndContinue(CUSTOMER);
      await checkoutPage.assertTotalCalculationIsCorrect();
    });

    test('verifies total is greater than subtotal', async ({ page }) => {
      const { checkoutPage } = await loginAndAddItems(page, [PRODUCTS.backpack.dataTest]);
      await checkoutPage.fillAndContinue(CUSTOMER);

      const { subtotal, tax, total } = await checkoutPage.getPriceSummary();
      expect(tax).toBeGreaterThan(0);
      expect(total).toBeGreaterThan(subtotal);
    });
  });

  test.describe('Full checkout flow', () => {
    test('completes checkout with two items and verifies confirmation', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(USERS.standard.username, USERS.standard.password);

      const inventoryPage = new InventoryPage(page);
      await inventoryPage.sortBy('hilo');
      await inventoryPage.assertPricesSortedDescending();

      await inventoryPage.addMultipleToCart([
        PRODUCTS.fleeceJacket.dataTest,
        PRODUCTS.backpack.dataTest,
      ]);
      await inventoryPage.assertCartBadgeCount(2);

      await inventoryPage.goToCart();
      const cartPage = new CartPage(page);
      await cartPage.assertItemInCart(PRODUCTS.fleeceJacket.name);
      await cartPage.assertItemInCart(PRODUCTS.backpack.name);
      await cartPage.assertItemCount(2);

      await cartPage.proceedToCheckout();
      const checkoutPage = new CheckoutPage(page);
      await checkoutPage.fillAndContinue(CUSTOMER);
      await checkoutPage.assertTotalCalculationIsCorrect();
      expect((await checkoutPage.getPriceSummary()).subtotal).toBeCloseTo(PRODUCTS.fleeceJacket.price + PRODUCTS.backpack.price, 2);

      await checkoutPage.finishOrder();
      await checkoutPage.assertConfirmationPage();
    });

    test('completes checkout with one item end to end', async ({ page }) => {
      const { checkoutPage } = await loginAndAddItems(page, [PRODUCTS.onesie.dataTest]);
      await checkoutPage.fillAndContinue(CUSTOMER);
      await checkoutPage.assertTotalCalculationIsCorrect();
      await checkoutPage.finishOrder();
      await checkoutPage.assertConfirmationPage();
    });

    test('returns to inventory from confirmation page and clears cart', async ({ page }) => {
      const { checkoutPage } = await loginAndAddItems(page, [PRODUCTS.backpack.dataTest]);
      await checkoutPage.fillAndContinue(CUSTOMER);
      await checkoutPage.finishOrder();
      await checkoutPage.assertConfirmationPage();

      await page.getByTestId('back-to-products').click();
      await expect(page).toHaveURL(/inventory/);
      await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
    });
  });
});
