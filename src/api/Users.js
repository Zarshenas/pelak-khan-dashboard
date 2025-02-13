import { api } from 'src/services/api';

export const Users = async (token) => {
  const response = await api.get(`${import.meta.env.VITE_API_BASE_URL}/users`);
  return { data: response.data, status: response.status };
};

export const deleteUser = async (id , token) =>{
  const response = await api.delete(`${import.meta.env.VITE_API_BASE_URL}/users/${id}/`);
  return {status: response.status };
} 

export const updateUser = async (id , data , token) =>{
  const response = await api.put(`${import.meta.env.VITE_API_BASE_URL}/users/${id}/`, data);
  return {status: response.status };
}