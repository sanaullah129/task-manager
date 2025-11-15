import api from './api';
import type { User } from '../types';

interface AuthResponse {
  token: string;
  user?: User;
}

export const signup = async (payload: { name?: string; email: string; password: string }) => {
  const { data } = await api.post<AuthResponse>('/auth/signup', payload);
  return data;
};

export const signin = async (payload: { email: string; password: string }) => {
  const { data } = await api.post<AuthResponse>('/auth/signin', payload);
  return data;
};

export const decodeJwt = (token: string): any => {
  try {
    const part = token.split('.')[1];
    return JSON.parse(atob(part));
  } catch {
    return null;
  }
};
