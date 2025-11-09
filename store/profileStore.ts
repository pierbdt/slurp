import { create } from "zustand";
import { profileApi } from "@/lib/api";

// Profile type
export interface Profile {
  id: number;
  user_id: string;
  gender: "male" | "female";
  looking_for: "male" | "female";
  date_of_birth: string;
  age?: number;
  snapchat_username?: string;
  bio?: string;
  is_complete: boolean;
  created_at: string;
  updated_at: string;
}

// Profile store state and actions
interface ProfileState {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setProfile: (profile: Profile | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  createProfile: (profileData: {
    user_id: string;
    gender: "male" | "female";
    looking_for: "male" | "female";
    date_of_birth: string;
    snapchat_username?: string;
    bio?: string;
  }) => Promise<void>;
  loadProfile: (userId: string) => Promise<void>;
  updateProfile: (
    userId: string,
    profileData: Partial<Omit<Profile, "id" | "user_id" | "created_at" | "updated_at">>
  ) => Promise<void>;
  clearProfile: () => void;
}

// Create the profile store
export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  isLoading: false,
  error: null,

  // Set the profile
  setProfile: (profile) => set({ profile }),

  // Set loading state
  setLoading: (isLoading) => set({ isLoading }),

  // Set error message
  setError: (error) => set({ error }),

  // Create a new profile
  createProfile: async (profileData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await profileApi.create(profileData);

      if (response.success) {
        set({
          profile: response.profile,
          isLoading: false,
        });
      } else {
        throw new Error(response.message || "Failed to create profile");
      }
    } catch (error: any) {
      console.error("Create profile error:", error);
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // Load profile by user ID
  loadProfile: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await profileApi.get(userId);

      if (response.success) {
        set({
          profile: response.profile,
          isLoading: false,
        });
      } else {
        // Profile not found is not an error for new users
        set({ profile: null, isLoading: false });
      }
    } catch (error: any) {
      console.error("Load profile error:", error);
      set({ profile: null, isLoading: false });
    }
  },

  // Update profile
  updateProfile: async (userId, profileData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await profileApi.update(userId, profileData);

      if (response.success) {
        set({
          profile: response.profile,
          isLoading: false,
        });
      } else {
        throw new Error(response.message || "Failed to update profile");
      }
    } catch (error: any) {
      console.error("Update profile error:", error);
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // Clear profile (on logout)
  clearProfile: () => set({ profile: null, error: null }),
}));
