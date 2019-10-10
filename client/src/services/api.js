import axios from 'axios'

const api = axios.create({
  //baseURL: 'https://protected-plateau-38218.herokuapp.com',
  baseURL: 'http://localhost:3333',
});

export default api;
