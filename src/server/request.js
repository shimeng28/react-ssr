import axios from 'axios';

const createInstance = (ctx) => {
  console.log(ctx);
  return axios.create({
    baseURL: 'http://127.0.0.1:3000/',
  });
};

export default createInstance;
