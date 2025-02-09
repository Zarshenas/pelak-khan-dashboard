import { api } from 'src/services/api';

export const Users = async (token) => {
  const response = await api.get(`${import.meta.env.VITE_API_BASE_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return { data: response.data, status: response.status };
};
