import api from './api';

export const signup = async (payload) => {
  const { data } = await api.post('/api/auth/signup', payload);
  return data;
};

export const signin = async (payload) => {
  const { data } = await api.post('/api/auth/signin', payload);
  return data;
};