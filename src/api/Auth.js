import { api } from "src/services/api";

export const login = async (credentials) => {
    const response = await api.post(`${import.meta.env.VITE_API_BASE_URL}/auth/jwt/create`, credentials);
    return {data: response.data ,status:response.status};
  };

  export const register = async (credentials) => {
    const response = await api.post(`${import.meta.env.VITE_API_BASE_URL}/users/`, credentials);
    return {data: response.data ,status:response.status};
  };
  
  export const checkAuth = async (token) => {
    if (!token.token) {
      return {data:"وارد شوید",status:401}
    }
    const response = await api.post('/auth/jwt/verify/', token);
    return {data: response.data,status:response.status};
  };
  export const logout = async () => {
    const response = await api.post(`${import.meta.env.VITE_API_BASE_URL}/auth/jwt/logout`);
    return {data: response.data,status:response.status};
  };