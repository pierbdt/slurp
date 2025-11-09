import { useEffect, useState } from "react";
import { Tabs, useRouter } from "expo-router";
import { Flame, Heart, MessageCircle, User } from "lucide-react-native";
import { useUserStore } from "@/store/userStore";
import { useProfileStore } from "@/store/profileStore";

export default function TabsLayout() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useUserStore();
  const { profile, loadProfile, isLoading: profileLoading } = useProfileStore();
  const [profileChecked, setProfileChecked] = useState(false);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isLoading && !isAuthenticated) {
      router.replace("/(auth)/login");
    }
  }, [isAuthenticated, isLoading]);

  useEffect(() => {
    // Check if user has a complete profile
    const checkProfile = async () => {
      if (isAuthenticated && user && !profileChecked) {
        await loadProfile(user.id);
        setProfileChecked(true);
      }
    };

    checkProfile();
  }, [isAuthenticated, user, profileChecked]);

  useEffect(() => {
    // Redirect to onboarding if profile is not complete
    if (profileChecked && !profileLoading && !profile) {
      router.replace("/(onboarding)/profile-setup");
    }
  }, [profileChecked, profileLoading, profile]);

  // Don't render tabs until auth and profile checks are complete
  if (isLoading || !isAuthenticated || !profileChecked || profileLoading) {
    return null;
  }

  // Don't render if no profile (will redirect)
  if (!profile) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FF4458",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#F3F4F6",
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Discover",
          tabBarIcon: ({ color, size }) => (
            <Flame color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          title: "Matches",
          tabBarIcon: ({ color, size }) => (
            <Heart color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ color, size }) => (
            <MessageCircle color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
