import { create } from 'zustand';
import { apiFetch } from '@/lib/api';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

interface AuthStore {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (name: string, email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,

  loadUser: async () => {
    try {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('access_token');
      if (storedUser && token) {
        set({ user: JSON.parse(storedUser), loading: false });
      } else {
        set({ user: null, loading: false });
      }
    } catch {
      set({ user: null, loading: false });
    }
  },

  signIn: async (email, password) => {
    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem('access_token', data.access_token);
      const userPayload = {
        id: data.user.id,
        name: data.user.username || email.split('@')[0],
        email: data.user.email,
        role: data.user.role
      };
      localStorage.setItem('user', JSON.stringify(userPayload));
      set({ user: userPayload });
      return null;
    } catch (error: any) {
      return error.message;
    }
  },

  signUp: async (name, email, password) => {
    try {
      const data = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, username: name }),
      });
      localStorage.setItem('access_token', data.access_token);
      const userPayload = {
        id: data.user.id,
        name,
        email: data.user.email,
        role: data.user.role
      };
      localStorage.setItem('user', JSON.stringify(userPayload));
      set({ user: userPayload });
      return null;
    } catch (error: any) {
      return error.message;
    }
  },

  signOut: async () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    set({ user: null });
  },
}));
