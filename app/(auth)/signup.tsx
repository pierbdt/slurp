import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function SignUp() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background px-8 pt-12">
      {/* Title */}
      <Text className="text-3xl font-bold text-text mb-4">
        Create Account
      </Text>
      <Text className="text-gray-600 mb-8">
        Join Slurp and start matching
      </Text>

      {/* Placeholder for form - will be added later */}
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-400 text-center mb-8">
          Sign up form coming soon...
        </Text>

        {/* Temporary button to navigate to tabs */}
        <TouchableOpacity
          onPress={() => router.replace("/(tabs)")}
          className="bg-primary px-8 py-3 rounded-full"
          activeOpacity={0.8}
        >
          <Text className="text-white font-semibold">
            Continue to App
          </Text>
        </TouchableOpacity>
      </View>

      {/* Log In Link */}
      <View className="flex-row justify-center mb-8">
        <Text className="text-gray-600">Already have an account? </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-primary font-semibold">Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
