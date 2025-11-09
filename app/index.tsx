import { useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Flame } from "lucide-react-native";
import { useUserStore } from "@/store/userStore";

export default function Index() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useUserStore();

  useEffect(() => {
    // Redirect to tabs if already authenticated
    if (!isLoading && isAuthenticated) {
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, isLoading]);

  // Show loading while checking session
  if (isLoading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#FF4458" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background items-center justify-center px-8">
      {/* Logo/Icon */}
      <View className="mb-8">
        <Flame size={80} color="#FF4458" fill="#FF4458" />
      </View>

      {/* Welcome Text */}
      <Text className="text-4xl font-bold text-text mb-2">
        Hello Slurp 🔥
      </Text>
      <Text className="text-lg text-gray-600 text-center mb-12">
        Find your perfect match today
      </Text>

      {/* Get Started Button */}
      <TouchableOpacity
        onPress={() => router.push("/(auth)/login")}
        className="bg-primary w-full py-4 rounded-full shadow-lg"
        activeOpacity={0.8}
      >
        <Text className="text-white text-center text-lg font-semibold">
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
}
