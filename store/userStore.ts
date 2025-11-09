import { create } from 'zustand';

// User type - will expand as features are added
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

  // Actions
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the user store
export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,

  // Set the current user
  setUser: (user) => set({ user, isAuthenticated: !!user }),

  // Set loading state
  setLoading: (isLoading) => set({ isLoading }),

  // Login action (placeholder - will integrate with Supabase later)
  login: async (email, password) => {
    set({ isLoading: true });
    try {
      // TODO: Integrate with Supabase auth
      // For now, just set a mock user
      const mockUser: User = {
        id: '1',
        email,
        name: 'Demo User',
      };
      set({ user: mockUser, isAuthenticated: true, isLoading: false });
    } catch (error) {
      console.error('Login error:', error);
      set({ isLoading: false });
    }
  },

  // Logout action
  logout: () => set({ user: null, isAuthenticated: false }),
}));
