const initializeDB = async (req) => {
  await req.post('/api/testing/reset');
  await req.post('/api/users', {
    data: {
      name: 'John Doe',
      username: 'FooBar',
      password: 'sekret',
    }
  });
};

export {
  initializeDB,
}