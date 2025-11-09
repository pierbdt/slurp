import { supabase } from "./supabase";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

/**
 * Get the current Supabase session token
 */
async function getAuthToken(): Promise<string | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.access_token || null;
}

/**
 * Make an authenticated API request
 */
async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const token = await getAuthToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(options.headers as Record<string, string>),
  };

  // Add auth token if available (for future Supabase JWT validation)
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data;
}

/**
 * Profile API methods
 */
export const profileApi = {
  /**
   * Create a new profile
   */
  create: async (profileData: {
    user_id: string;
    gender: "male" | "female";
    looking_for: "male" | "female";
    date_of_birth: string; // YYYY-MM-DD format
    snapchat_username?: string;
    bio?: string;
  }) => {
    return apiRequest("/profiles", {
      method: "POST",
      body: JSON.stringify(profileData),
    });
  },

  /**
   * Get profile by user ID
   */
  get: async (userId: string) => {
    return apiRequest(`/profiles/${userId}`);
  },

  /**
   * Update profile
   */
  update: async (
    userId: string,
    profileData: {
      gender?: "male" | "female";
      looking_for?: "male" | "female";
      date_of_birth?: string;
      snapchat_username?: string;
      bio?: string;
    }
  ) => {
    return apiRequest(`/profiles/${userId}`, {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  },
};
