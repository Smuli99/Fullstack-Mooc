const { test, describe, beforeEach, expect } = require('@playwright/test');
const { initializeDB, loginWith, createBlog } = require('./helper');

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

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'FooBar', 'salainen123');
      });

      test('user can logout', async ({ page }) => {
        await page.getByRole('button', { name: 'logout' }).click();
        await expect(page.getByText('Login to Blog App')).toBeVisible();
        await expect(page.getByText('John Doe logged in')).not.toBeVisible();
      });

      test('a new blog can be created', async ({ page }) => {
        const title = 'The Odyssey';
        const author = 'Cristofer Nolan';
        const url = 'https://example.com';
        
        await createBlog(
          page, 
          title,
          author,
          url
        );

        await expect(page.getByText(`\`${title}\` by ${author} added!`)).toBeVisible();
        await expect(page.getByText(`${title} by ${author}`)).toBeVisible();
      });
    });
  });
});