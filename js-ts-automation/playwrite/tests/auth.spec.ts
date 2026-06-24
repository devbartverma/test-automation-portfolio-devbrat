import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { USERS, URLS, ERROR_MESSAGES } from '../data/testData';

test.describe('Authentication', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('logs in standard user and shows inventory', async ({ page }) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await loginPage.assertSuccessfulLogin();
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('shows six inventory products after login', async ({ page }) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });

  test('retains session after page reload', async ({ page }) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await page.reload();
    await expect(page).toHaveURL(URLS.inventory);
  });

  test('shows locked-out error with icon for locked_out_user', async () => {
    await loginPage.loginAndExpectError(
      USERS.locked.username,
      USERS.locked.password,
      ERROR_MESSAGES.lockedOut
    );
    await loginPage.assertErrorIconVisible();
  });

  test('shows invalid credentials error', async () => {
    await loginPage.loginAndExpectError(
      USERS.invalid.username,
      USERS.invalid.password,
      ERROR_MESSAGES.invalidCredentials
    );
  });

  test('shows username required error', async () => {
    await loginPage.loginAndExpectError('', USERS.standard.password, ERROR_MESSAGES.missingUsername);
  });

  test('shows password required error', async () => {
    await loginPage.loginAndExpectError(USERS.standard.username, '', ERROR_MESSAGES.missingPassword);
  });

  test('shows username required error when both fields are empty', async () => {
    await loginPage.loginAndExpectError('', '', ERROR_MESSAGES.missingUsername);
  });

  test('stays on login page after failed authentication', async ({ page }) => {
    await loginPage.login(USERS.invalid.username, USERS.invalid.password);
    await expect(page).toHaveURL(URLS.base);
  });

  test('logs out and blocks access to inventory', async ({ page }) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page).toHaveURL(URLS.base);
    await page.goto(URLS.inventory);
    await expect(page).toHaveURL(URLS.base);
  });
});
