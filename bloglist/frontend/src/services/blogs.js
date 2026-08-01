import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

export default { getAll };