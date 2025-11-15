import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '../types';
import { decodeJwt } from '../services/auth';

interface AuthState {
  token: string | null;
  user: User | null;
}

interface AuthActions {
  signin: (token: string, user?: User) => void;
  signout: () => void;
}

type AuthStore = AuthState & AuthActions;

const buildUserFromToken = (token: string): User | null => {
  try {
    const decoded = decodeJwt(token);
    if (!decoded) return null;
    return {
      id: decoded.sub || decoded.id || decoded._id || '',
      email: decoded.email || '',
      name: decoded.name,
      role: decoded.role || 'user',
    };
  } catch {
    return null;
  }
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      signin: (token, user) => {
        const current = get();
        if (current.token === token && (!user || user === current.user)) return;
        try { localStorage.setItem('token', token); } catch {}
        set({ token, user: user || buildUserFromToken(token) });
      },
      signout: () => {
        const current = get();
        if (!current.token && !current.user) return;
        set({ token: null, user: null });
        try { localStorage.removeItem('token'); } catch {}
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token, user: state.user }),
      version: 1,
    }
  )
);

// Derived selectors (stable, simple comparisons to reduce rerenders)
export const useIsAdmin = () => useAuthStore((s) => s.user?.role === 'admin');
export const useAuthToken = () => useAuthStore((s) => s.token);
export const useAuthUser = () => useAuthStore((s) => s.user);