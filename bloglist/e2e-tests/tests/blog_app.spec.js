const { test, describe, beforeEach, expect } = require('@playwright/test');
const { initializeDB } = require('./helper');

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
});