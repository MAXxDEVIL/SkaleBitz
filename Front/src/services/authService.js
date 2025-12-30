import api from './api';

export const signup = async (payload) => {
  const { data } = await api.post('/api/auth/signup', payload);
  return data;
};

export const signin = async (payload) => {
  const { data } = await api.post('/api/auth/signin', payload);
  return data;
};

export const deleteAccount = async () => {
  const { data } = await api.delete('/api/auth/me');
  return data;
};