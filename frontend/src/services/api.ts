import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
});

api.interceptors.request.use(config => {
  // Prefer store state over legacy localStorage key
  const token = useAuthStore.getState().token || localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete (config.headers as any).Authorization;
  }
  return config;
});

api.interceptors.response.use(
  r => r,
  err => {
    if (err.response && err.response.status === 401) {
      try { localStorage.removeItem('token'); } catch {}
      // Clear store token to force logout
      useAuthStore.setState({ token: null, user: null });
    }
    return Promise.reject(err);
  }
);

export default api;
