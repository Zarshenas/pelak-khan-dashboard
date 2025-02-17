import axios from 'axios';
import { redirect } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json'  },
  withCredentials: true,
});

export const refreshAccessToken = async () => {
  const oldToken = localStorage.getItem('access');
  console.log(oldToken);
  try {
    const response = await api.post('/auth/jwt/verify', {
      "token": oldToken,
    },{
  });
    const newAccessToken = response.data.accessToken;
    console.log(newAccessToken);
    localStorage.setItem('access', newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.log(error);
    console.error('Refresh token failed', error);
    return null;
  }
};

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('access');

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log(error.response?.status);
    console.log(!originalRequest._retry);

    // If access token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      redirect('/')
    //   originalRequest._retry = true;
    //   const newAccessToken = await refreshAccessToken();
    // console.log(newAccessToken);

    //   if (newAccessToken) {
    //     originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

    //     return api(originalRequest);
    //   }
    }

    return Promise.reject(error);
  }
);
