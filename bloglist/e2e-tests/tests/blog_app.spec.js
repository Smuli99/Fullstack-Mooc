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

  // test('Login form is shown', async ({ page }) => {
  //   await expect(page.getByText('Login to Blog App')).toBeVisible();
  //   await expect(page.getByLabel('username')).toBeVisible();
  //   await expect(page.getByLabel('password')).toBeVisible();
  //   await expect(page.getByRole('button', { name: 'login' })).toBeVisible();
  // });
  
  describe('Navigation', () => {
    test('blogs page is rendered initially', async ({ page }) => {
      await expect(page.getByText('blogs')).toBeVisible();
      await expect(page.getByText('login')).toBeVisible();
      await expect(page.getByText('Blog App')).toBeVisible();
    });

    test('login link navigates to login page', async ({ page }) => {
      await page.getByText('login').click();

      await expect(page.getByText('Login to Blog App')).toBeVisible();
      await expect(page.getByLabel('username')).toBeVisible();
      await expect(page.getByLabel('password')).toBeVisible();
      await expect(page.getByRole('button', { name: 'login' })).toBeVisible();
    });
  });


  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await login(page);
      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible();
      await expect(page.getByText('new blog')).toBeVisible();
      await expect(page.getByText('login')).not.toBeVisible();
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
        await expect(page.getByText('login')).toBeVisible();
        await expect(page.getByRole('button', { name: 'logout' })).not.toBeVisible();
      });

      test('new blog link navigates to new blog form', async ({ page }) => {
        await page.getByText('new blog').click();

        await expect(page.getByText('Create New Blog')).toBeVisible();
        await expect(page.getByLabel('title')).toBeVisible();
        await expect(page.getByLabel('author')).toBeVisible();
        await expect(page.getByLabel('url')).toBeVisible();
        await expect(page.getByRole('button', { name: 'create' })).toBeVisible();
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

        test('blog link navigates to blog page', async ({ page }) => {
          await page.getByText('Avengers Doomsday by Marvel').click();

          await expect(page.getByText('Marvel: Avengers Doomsday')).toBeVisible();
          await expect(page.getByText('www.coming.com')).toBeVisible();
          await expect(page.getByText('www.coming.com')).toHaveAttribute('href', 'www.coming.com');
          await expect(page.getByText('likes: 0')).toBeVisible();
          await expect(page.getByText('Added by John Doe')).toBeVisible();
        });

        test('blog can be liked', async ({ page }) => {
          await page.getByText('Friends by Netflix').click();
          await expect(page.getByText('likes: 0')).toBeVisible();

          await like(page);
          await expect(page.getByText('likes: 1')).toBeVisible();

          await like(page);
          await expect(page.getByText('likes: 2')).toBeVisible();
        });

        test('blogs are listed in descending order by their likes', async ({ page }) => {
          await page.locator('li').first().waitFor();
          let blogs = await page.locator('li');

          // liking blogs
          await page.getByText('Friends by Netflix').click();
          await like(page, 3);
          await page.getByText('blogs').click();

          await page.getByText('Odyssey by Cristofer Nolan').click();
          await like(page, 2);
          await page.getByText('blogs').click();

          // cheking the order
          blogs = page.locator('li');
          
          await expect(blogs.first()).toContainText('Friends by Netflix');
          await expect(blogs.nth(1)).toContainText('Odyssey by Cristofer Nolan');
          await expect(blogs.nth(2)).toContainText('Doomsday by Marvel');
        });

        describe('Removing blog', () => {
          test('succeeds if user is the blog creator', async ({ page }) => {
            const blog = await page
              .locator('li')
              .filter({ hasText: 'The Odyssey by Cristofer Nolan' });

            page.once('dialog', async dialog => {
              await dialog.accept();
            });

            await blog.getByRole('button', { name: 'delete' }).click();
  
            await expect(page.getByText('The Odyssey by Cristofer Nolan deleted!')).toBeVisible();
            await expect(blog).not.toBeVisible();
          });
  
          test('fails if user is not the blog creator', async ({ page }) => {
            const blog = page
              .locator('li')
              .filter({ hasText: 'Friends by Netflix' });

            await expect(blog.getByRole('button', { name: 'delete' })).not.toBeVisible();
          });
        });
      });
    });
  });
});