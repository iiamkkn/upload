import axios from 'axios';
import { AxiosInstance } from '../AxiosInstance';

const API = AxiosInstance.create({ baseURL: '/api/products' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('userInfo')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('userInfo')).token
    }`;
  }

  return req;
});

export const getTimelinePosts = (id) => API.get(`/zain/${id}/timeline`);

export const likePost = (id, userId) =>
  API.put(`zain/${id}/like`, { userId: userId });
