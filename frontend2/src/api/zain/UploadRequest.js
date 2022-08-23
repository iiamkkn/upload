import axios from 'axios';

const API = axios.create({
  baseURL: 'http://91.227.139.152/api',
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('userInfo')).token
    }`;
  }

  return req;
});

export const uploadImage = (data) => API.post('/upload/zain', data);
export const uploadPost = (data) => API.post('/products/zain', data);
