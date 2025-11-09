import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

// User type - matches Supabase user structure
interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}

// User store state and actions
interface UserState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;

  // Actions
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkSession: () => Promise<void>;
  updateProfile: (name: string) => Promise<void>;
}

// Create the user store
export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,

  // Set the current user
  setUser: (user) => set({ user, isAuthenticated: !!user }),

  // Set loading state
  setLoading: (isLoading) => set({ isLoading }),

  // Set error message
  setError: (error) => set({ error }),

  // Sign up with email and password
  signUp: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name || '',
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        set({
          user: {
            id: data.user.id,
            email: data.user.email!,
            name: data.user.user_metadata?.name,
          },
          isAuthenticated: true,
          isLoading: false,
        });
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // Sign in with email and password
  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        set({
          user: {
            id: data.user.id,
            email: data.user.email!,
            name: data.user.user_metadata?.name,
          },
          isAuthenticated: true,
          isLoading: false,
        });
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // Sign out
  signOut: async () => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error: any) {
      console.error('Sign out error:', error);
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // Check if user has an active session
  checkSession: async () => {
    set({ isLoading: true });
    try {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) throw error;

      if (session?.user) {
        set({
          user: {
            id: session.user.id,
            email: session.user.email!,
            name: session.user.user_metadata?.name,
          },
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    } catch (error: any) {
      console.error('Session check error:', error);
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  // Update user profile
  updateProfile: async (name) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          name,
        },
      });

      if (error) throw error;

      if (data.user) {
        set({
          user: {
            id: data.user.id,
            email: data.user.email!,
            name: data.user.user_metadata?.name,
          },
          isLoading: false,
        });
      }
    } catch (error: any) {
      console.error('Update profile error:', error);
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },
}));
