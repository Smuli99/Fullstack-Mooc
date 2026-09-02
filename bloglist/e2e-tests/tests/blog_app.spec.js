const { test, describe, beforeEach, expect } = require('@playwright/test');
const { initializeDB, loginWith } = require('./helper');

describe('Blog App', () => {
  beforeEach(async ({ page, request }) => {
    await initializeDB(request);
    await page.goto('/');
  });

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Login to Blog App')).toBeVisible();
    await expect(page.getByLabel('username')).toBeVisible();
    await expect(page.getByLabel('password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible();
  });

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'FooBar', 'salainen123');
      await expect(page.getByText('John Doe logged in')).toBeVisible();
    });
  
    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'FooBar', 'sekret');
      await expect(page.getByText('wrong username or password')).toBeVisible();
    });
  });
});