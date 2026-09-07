const { expect } = require('@playwright/test');

const users = [
  {
    name: 'John Doe',
    username: 'FooBar',
    password: 'salainen123',
  },
  {
    name: 'Samu Hytönen',
    username: 'hytosama',
    password: 'sekret123',
  },
];

const initializeDB = async (req) => {
  await req.post('/api/testing/reset');
  await req.post('/api/users', {
    data: users[0]
  });
  await req.post('/api/users', {
    data: users[1]
  });
};

const login = async (
  page,
  username = users[0].username,
  password = users[0].password,
) => {
  await page.getByLabel('username').fill(username);
  await page.getByLabel('password').fill(password);
  await page.getByRole('button', { name: 'login' }).click();
};

const logout = async (page) => {
  await page.getByRole('button', { name: 'logout' }).click();
};

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'new blog' }).click();
  
  await page.getByLabel('title').fill(title);
  await page.getByLabel('author').fill(author);
  await page.getByLabel('url').fill(url);
  
  await page.getByRole('button', { name: 'create' }).click();
  await page.getByText(`${title} by ${author}`).waitFor();
  
  await page.getByRole('button', { name: 'cancel' }).click();
};

const createBlogWithOtherUser = async (page, title, author, url) => {
  await logout(page);
  await login(page, users[1].username, users[1].password);

  await createBlog(page, title, author, url);
  await logout(page);

  await login(page);
};

const like = async (blogElement, amount = 1) => {
  const likeElement = await blogElement.getByText('likes:');
  let likes = parseInt(
    (await likeElement.innerText())
    .substring(7));

  for (let i = 0; i < amount; i++) {
    await blogElement.getByRole('button', { name: 'like' }).click();
    await blogElement.getByText(`likes: ${likes++ + 1}`).waitFor();
  }
};

export {
  initializeDB,
  login,
  logout,
  createBlog,
  createBlogWithOtherUser,
  like,
}