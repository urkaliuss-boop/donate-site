import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
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
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      set({
        user: profile
          ? { id: profile.id, name: profile.name, email: profile.email, avatar: profile.avatar }
          : null,
        loading: false,
      });
    } else {
      set({ user: null, loading: false });
    }
  },

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return error.message;
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();
    set({
      user: profile
        ? { id: profile.id, name: profile.name, email: profile.email, avatar: profile.avatar }
        : { id: data.user.id, name: email.split('@')[0], email },
    });
    return null;
  },

  signUp: async (name, email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) return error.message;
    if (data.user) {
      set({ user: { id: data.user.id, name, email } });
    }
    return null;
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
