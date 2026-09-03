const { test, describe, beforeEach, expect } = require('@playwright/test');
const { 
  initializeDB,
  login,
  logout,
  createBlog,
  createBlogWithOtherUser,
  like
} = require('./helper');

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
      await login(page);
      await expect(page.getByText('John Doe logged in')).toBeVisible();
    });
  
    test('fails with wrong credentials', async ({ page }) => {
      await login(page, 'FooBar', 'sekret', true);
      await expect(page.getByText('wrong username or password')).toBeVisible();
    });

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await login(page);
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

      describe('When some blogs saved', () => {
        beforeEach(async ({ page }) => {
          await createBlog(
            page,
            'The Odyssey',
            'Cristofer Nolan',
            'https://example.com'
          );

          await createBlog(
            page,
            'Avengers Doomsday',
            'Marvel',
            'www.coming.com'
          );

          await createBlogWithOtherUser(
            page,
            'Friends',
            'Netflix',
            'www.netflix.com'
          );
        });

        test('more information about blog can be viewed', async ({ page }) => {  
          const blogElement = await page
            .locator('.blog')
            .filter({ hasText: 'The Odyssey by Cristofer Nolan' });

          await expect(blogElement.getByText('likes: 0')).not.toBeVisible();
          await expect(blogElement.getByText('https://example.com')).not.toBeVisible();
          await expect(blogElement.getByRole('button', { name: 'like' })).not.toBeVisible();
          await expect(blogElement.getByText('John Doe')).not.toBeVisible();
          
          await blogElement.getByRole('button', { name: 'view' }).click();
          await expect(blogElement.getByText('https://example.com')).toBeVisible();
          await expect(blogElement.getByText('likes: 0')).toBeVisible();
          await expect(blogElement.getByRole('button', { name: 'like' })).toBeVisible();
          await expect(blogElement.getByText('John Doe')).toBeVisible();
        });

        test('blog can be liked', async ({ page }) => {
          const blogElement = await page
            .locator('.blog')
            .filter({ hasText: 'Friends by Netflix' });
          
          await blogElement.getByRole('button', { name: 'view' }).click();
          await expect(blogElement.getByText('likes: 0')).toBeVisible();

          await like(blogElement);
          await expect(blogElement.getByText('likes: 1')).toBeVisible();

          await like(blogElement);
          await expect(blogElement.getByText('likes: 2')).toBeVisible();
        });
      });
    });
  });
});