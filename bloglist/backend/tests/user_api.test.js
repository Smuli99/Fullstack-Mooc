const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const helper = require('./test_helper');

const api = supertest(app);

describe('When there is initially some users in database', () => {
  beforeEach(async () => {
    await helper.initializeDatabase();
  });

  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all users are returned', async () => {
    const res = await api.get('/api/users');
    assert.strictEqual(res.body.length, helper.initialUsers.length);
  });

  describe('creation of a user', () => {
    test('succeeds with valid data', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'foobar00',
        password: 'salainen00'
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

    test('fails with proper status code and message if username missing', async () => {
      const newUser = {
        name: 'foobar00',
        password: 'salainen00'
      };

      const res = await api
        .post('/api/users')
        .send(newUser)
        .expect(400);

      assert(res.body.error.includes('`username` is required'));

      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(usersAtEnd.length, helper.initialUsers.length);
    });

    test('fails with proper status code and message if username is too short', async () => {
      const newUser = {
        username: 'fo',
        password: 'salainen00'
      };

      const res = await api
        .post('/api/users')
        .send(newUser)
        .expect(400);

      assert(res.body.error.includes(
        '`username` (`fo`, length 2) is shorter than the minimum allowed length (3)'
      ));

      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(usersAtEnd.length, helper.initialUsers.length);
    });

    test('fails with proper status code and message if username already taken', async () => {
      const newUser = {
        username: helper.initialUsers[0].username,
        password: 'salainen00'
      };

      const res = await api
        .post('/api/users')
        .send(newUser)
        .expect(400);

      assert(res.body.error.includes('expected `username` to be unique'));

      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(usersAtEnd.length, helper.initialUsers.length);
    });

    test('fails with proper status code and message if password is missing', async () => {
      const newUser = {
        username: 'root',
        name: 'Foo Bar'
      };

      const res = await api
        .post('/api/users')
        .send(newUser)
        .expect(400);

      assert(res.body.error.includes('`password` is required'));

      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(usersAtEnd.length, helper.initialUsers.length);
    });

    test('fails with proper status code and message if password is too short', async () => {
      const newUser = {
        username: 'root',
        name: 'Foo Bar',
        password: 'short'
      };

      const res = await api
        .post('/api/users')
        .send(newUser)
        .expect(400);


      assert(res.body.error.includes(
        '`password` (`short`, length 5) is shorter than the minimum allowed length (8)'
      ));

      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(usersAtEnd.length, helper.initialUsers.length);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});