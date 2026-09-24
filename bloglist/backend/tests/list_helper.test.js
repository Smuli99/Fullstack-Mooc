const { test, describe } = require('node:test');
const assert = require('node:assert');

const listHelper = require('../utils/list_helper');

// Test Data
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
];

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  },
];

test('dummy return one', () => {
  const noBlogs = [];

  const result = listHelper.dummy(noBlogs);
  assert.strictEqual(result, 1);
});

describe('total likes', () => {
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test('list with multiple blogs equals likes sum of all blogs likes', () => {
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 36);
  });
});

describe('favorite blog', () => {
  test('when list has one blog equals it to favorite', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    assert.deepStrictEqual(result, listWithOneBlog[0]);
  });

  test('when list has multiple blogs favorite blog is blog with multiple likes', () => {
    const result = listHelper.favoriteBlog(blogs);
    assert.deepStrictEqual(result, blogs[2]);
  });

  test('when list is empty favorite blog is undefined', () => {
    const result = listHelper.favoriteBlog([]);
    assert.strictEqual(result, undefined);
  });
});

describe('most blogs', () => {
  test('list that has no blogs returns undefinded', () => {
    const result = listHelper.mostBlogs([]);
    assert.strictEqual(result, undefined);
  });

  test('list that has one blog author that has most blogs is that', () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    const correct = {
      author: "Edsger W. Dijkstra",
      blogs: 1,
    };
    assert.deepStrictEqual(result, correct);
  });

  test('list that has multiple blogs most blogs equals to author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs);
    const correct = {
      author: "Robert C. Martin",
      blogs: 3,
    };
    assert.deepStrictEqual(result, correct);
  });
});

describe('most likes', () => {
  test('list is empty equals to undefined', () => {
    const result = listHelper.mostLikes([]);
    assert.strictEqual(result, undefined);
  });

  test('list with on blog equals to blogs author', () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    const correct = {
      author: "Edsger W. Dijkstra",
      likes: 5,
    };

    assert.deepStrictEqual(result, correct);
  });

  test('list with multiple blogs equals to author with most likes in blogs', () => {
    const result = listHelper.mostLikes(blogs);
    const correct = {
      author: "Edsger W. Dijkstra",
      likes: 17,
    };

    assert.deepStrictEqual(result, correct);
  });
});