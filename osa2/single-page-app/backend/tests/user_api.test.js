const { test, beforeEach, after, describe } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const helper = require('./test_helper');

const api = supertest(app);

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await helper.inititalizeDatabase();
  });

  describe('creating new user', () => {
    test('succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'hytosama',
        name: 'Samu Hytönen',
        password: 'salainen',
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

      const usernames = usersAtEnd.map(user => user.username);
      assert(usernames.includes(newUser.username));
    });

    test('fails with proper status code and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: usersAtStart[0].username,
        name: 'Superuser',
        password: 'salainen',
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(usersAtEnd.length, usersAtStart.length);
      assert(result.body.error.includes('expected `username` to be unique'));
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});