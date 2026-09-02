const initializeDB = async (req) => {
  const response1 = await req.post('/api/testing/reset');
  const response2 = await req.post('/api/users', {
    data: {
      name: 'John Doe',
      username: 'FooBar',
      password: 'salainen123',
    }
  });
};

const loginWith = async (page, username, password) => {
  await page.getByLabel('username').fill(username);
  await page.getByLabel('password').fill(password);
  await page.getByRole('button', { name: 'login' }).click();
};

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'new blog' }).click();
  await page.getByLabel('title').fill(title);
  await page.getByLabel('author').fill(author);
  await page.getByLabel('url').fill(url);
  await page.getByRole('button', { name: 'create' }).click();

  // await page.getByText(`${title} by ${author}`).waitFor();
};

export {
  initializeDB,
  loginWith,
  createBlog,
}