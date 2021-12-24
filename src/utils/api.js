import axios from 'axios';

const api = () => {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  });
  return api;
}

export default api;