const bcrypt = require('bcrypt');
const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: "6a675e977954defdb519667e",
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    user: "6a675e977954defdb519667f",
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    user: "6a675e977954defdb519667f",
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    user: "6a675e977954defdb5196680",
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    user: "6a675e977954defdb5196680",
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    user: "6a675e977954defdb5196680",
    __v: 0
  },
];

const initialUsers = [
  {
    _id: "6a675e977954defdb519667e",
    username: "hytosama",
    name: "Samu Hytönen",
    password: "salainen123",
    blogs: [
      "5a422a851b54a676234d17f7",
    ],
    __v: 0
  },
  {
    _id: "6a675e977954defdb519667f",
    username: "admin",
    name: "developer",
    blogs: [
      "5a422aa71b54a676234d17f8",
      "5a422b3a1b54a676234d17f9",
    ],
    password: "supersalainen",
    __v: 0
  },
  {
    _id: "6a675e977954defdb5196680",
    username: "superuser",
    name: "John Doe",
    password: "sekret123",
    blogs: [
      "5a422b891b54a676234d17fa",
      "5a422ba71b54a676234d17fb",
      "5a422bc61b54a676234d17fc",
    ],
    __v: 0
  },
];

const createUsers = async () => {
  return Promise.all(
    initialUsers.map(async user => ({
      _id: user._id,
      username: user.username,
      name: user.name,
      password: await bcrypt.hash(user.password, 10),
      blogs: user.blogs,
      __v: user.__v,
    }))
  );
};

const initializeDatabase = async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  const users = await createUsers();

  await User.insertMany(users);
  await Blog.insertMany(initialBlogs);
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const nonExistingId = async () => {
  const blog = new Blog({
    title: "Valid Id",
    url: "https://todelete.com",
    user: initialUsers[0]._id,
  });

  await blog.save();
  await blog.deleteOne();
  return blog.id;
};

const nonExistingBlog = async () => {
  const blog = new Blog({
    title: "update",
    url: "https://example.com",
    user: initialUsers[0]._id,
  });

  await blog.save();
  await blog.deleteOne();

  return blog.toJSON();
};

module.exports = {
  initialBlogs,
  initialUsers,
  initializeDatabase,
  usersInDb,
  blogsInDb,
  nonExistingId,
  nonExistingBlog,
};