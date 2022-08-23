import axios from 'axios';
import { AxiosInstance } from '../AxiosInstance';

const API = AxiosInstance.create({ baseURL: '/api/users' });

export const logIn = (formData) => API.post('/zain/login', formData);

export const signUp = (formData) => API.post('/zain/register', formData);
