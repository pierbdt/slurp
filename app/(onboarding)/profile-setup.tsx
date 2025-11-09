import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useUserStore } from "@/store/userStore";

export default function ProfileSetup() {
  const router = useRouter();
  const { user } = useUserStore();
  const [gender, setGender] = useState<"male" | "female" | null>(null);

  const handleContinue = () => {
    if (!gender) return;

    // Pass gender to next screen via params
    router.push({
      pathname: "/(onboarding)/profile-details",
      params: { gender },
    });
  };

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      {/* Progress Indicator */}
      <View className="mb-8">
        <View className="flex-row gap-2">
          <View className="flex-1 h-1 bg-primary rounded-full" />
          <View className="flex-1 h-1 bg-gray-300 rounded-full" />
        </View>
        <Text className="text-gray-500 text-sm mt-2">Step 1 of 2</Text>
      </View>

      {/* Title */}
      <Text className="text-3xl font-bold text-text mb-2">
        I am a...
      </Text>
      <Text className="text-gray-600 mb-12">
        This helps us show you the right matches
      </Text>

      {/* Gender Selection */}
      <View className="gap-4 mb-8">
        <TouchableOpacity
          onPress={() => setGender("male")}
          className={`p-6 rounded-2xl border-2 ${
            gender === "male"
              ? "border-primary bg-primary/10"
              : "border-gray-300 bg-white"
          }`}
          activeOpacity={0.7}
        >
          <Text
            className={`text-2xl font-semibold text-center ${
              gender === "male" ? "text-primary" : "text-gray-700"
            }`}
          >
            🙋‍♂️ Male
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setGender("female")}
          className={`p-6 rounded-2xl border-2 ${
            gender === "female"
              ? "border-primary bg-primary/10"
              : "border-gray-300 bg-white"
          }`}
          activeOpacity={0.7}
        >
          <Text
            className={`text-2xl font-semibold text-center ${
              gender === "female" ? "text-primary" : "text-gray-700"
            }`}
          >
            🙋‍♀️ Female
          </Text>
        </TouchableOpacity>
      </View>

      {/* Continue Button */}
      <View className="mt-auto mb-8">
        <TouchableOpacity
          onPress={handleContinue}
          className={`px-8 py-4 rounded-full ${
            gender ? "bg-primary" : "bg-gray-300"
          }`}
          activeOpacity={0.8}
          disabled={!gender}
        >
          <Text className="text-white font-semibold text-center text-lg">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
