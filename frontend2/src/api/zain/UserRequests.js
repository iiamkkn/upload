import axios from 'axios';

const API = axios.create({ baseURL: 'http://91.227.139.152/api/users' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('userInfo')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('userInfo')).token
    }`;
  }

  return req;
});

export const getUser = (userId) => API.get(`/zain/${userId}`);
export const updateUser = (id, formData) => API.put(`/zain/${id}`, formData);
export const getAllUser = () => API.get('/');
export const followUser = (id, data) => API.put(`/zain/${id}/follow`, data);
export const unfollowUser = (id, data) => API.put(`/zain/${id}/unfollow`, data);
