import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async (blog) => {
  const config = {
    headers: { Authorization: token }
  };

  const res = await axios.post(baseUrl, blog, config);
  return res.data;
};

const update = async (blog) => {
  const res = await axios.put(`${baseUrl}/${blog.id}`, blog);
  return res.data;
};

const remove = async (blog) => {
  const config = {
    headers: { Authorization: token }
  };

  await axios.delete(`${baseUrl}/${blog.id}`, config);
};

export default {
  getAll,
  setToken,
  create,
  update,
  remove,
};