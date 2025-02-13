import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  withCredentials: true,
});


export const refreshAccessToken = async () => {
    try {
      const response = await api.post("/auth/jwt/verify");
      const newAccessToken = response.data.accessToken;
      localStorage.setItem("access", newAccessToken); // Save new token
      return newAccessToken;
    } catch (error) {
      console.error("Refresh token failed", error);
      return null;
    }
  };

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('access');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If access token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();
      console.log(newAccessToken)
      if (newAccessToken) {
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);
