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

export default {
  getAll,
  setToken,
  create,
};