import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator, ScrollView, Platform } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useUserStore } from "@/store/userStore";
import { useProfileStore } from "@/store/profileStore";

export default function ProfileDetails() {
  const router = useRouter();
  const { gender } = useLocalSearchParams<{ gender: "male" | "female" }>();
  const { user } = useUserStore();
  const { createProfile, isLoading } = useProfileStore();

  const [lookingFor, setLookingFor] = useState<"male" | "female" | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState(new Date(2000, 0, 1));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [snapchatUsername, setSnapchatUsername] = useState("");

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleComplete = async () => {
    if (!lookingFor) {
      Alert.alert("Error", "Please select who you're looking for");
      return;
    }

    const age = calculateAge(dateOfBirth);
    if (age < 18) {
      Alert.alert("Error", "You must be at least 18 years old to use Slurp");
      return;
    }

    if (!snapchatUsername.trim()) {
      Alert.alert("Error", "Please enter your Snapchat username");
      return;
    }

    try {
      // Format date as YYYY-MM-DD for Laravel
      const formattedDate = dateOfBirth.toISOString().split("T")[0];

      await createProfile({
        user_id: user!.id,
        gender: gender!,
        looking_for: lookingFor,
        date_of_birth: formattedDate,
        snapchat_username: snapchatUsername.trim(),
      });

      Alert.alert(
        "Profile Complete!",
        "Your profile has been set up successfully",
        [{ text: "Let's Go!", onPress: () => router.replace("/(tabs)") }]
      );
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to create profile");
    }
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="px-8 pt-16 pb-8">
        {/* Progress Indicator */}
        <View className="mb-8">
          <View className="flex-row gap-2">
            <View className="flex-1 h-1 bg-primary rounded-full" />
            <View className="flex-1 h-1 bg-primary rounded-full" />
          </View>
          <Text className="text-gray-500 text-sm mt-2">Step 2 of 2</Text>
        </View>

        {/* Title */}
        <Text className="text-3xl font-bold text-text mb-2">
          Complete Your Profile
        </Text>
        <Text className="text-gray-600 mb-8">
          Just a few more details to get started
        </Text>

        {/* Date of Birth */}
        <View className="mb-6">
          <Text className="text-gray-700 mb-2 font-medium">Date of Birth</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="bg-white border border-gray-300 rounded-lg px-4 py-3"
          >
            <Text className="text-text text-base">
              {formatDate(dateOfBirth)} (Age: {calculateAge(dateOfBirth)})
            </Text>
          </TouchableOpacity>
          <Text className="text-gray-500 text-xs mt-1">
            You must be 18+ to use Slurp
          </Text>

          {showDatePicker && (
            <DateTimePicker
              value={dateOfBirth}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                setShowDatePicker(Platform.OS === "ios");
                if (selectedDate) {
                  setDateOfBirth(selectedDate);
                }
              }}
              maximumDate={new Date()}
              minimumDate={new Date(1940, 0, 1)}
            />
          )}
        </View>

        {/* Looking For */}
        <View className="mb-6">
          <Text className="text-gray-700 mb-2 font-medium">
            I'm looking for...
          </Text>
          <View className="gap-3">
            <TouchableOpacity
              onPress={() => setLookingFor("male")}
              className={`p-4 rounded-xl border-2 ${
                lookingFor === "male"
                  ? "border-primary bg-primary/10"
                  : "border-gray-300 bg-white"
              }`}
              activeOpacity={0.7}
            >
              <Text
                className={`text-lg font-semibold text-center ${
                  lookingFor === "male" ? "text-primary" : "text-gray-700"
                }`}
              >
                🙋‍♂️ Men
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setLookingFor("female")}
              className={`p-4 rounded-xl border-2 ${
                lookingFor === "female"
                  ? "border-primary bg-primary/10"
                  : "border-gray-300 bg-white"
              }`}
              activeOpacity={0.7}
            >
              <Text
                className={`text-lg font-semibold text-center ${
                  lookingFor === "female" ? "text-primary" : "text-gray-700"
                }`}
              >
                🙋‍♀️ Women
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Snapchat Username */}
        <View className="mb-8">
          <Text className="text-gray-700 mb-2 font-medium">
            Snapchat Username
          </Text>
          <TextInput
            className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-text"
            placeholder="@yourusername"
            placeholderTextColor="#9CA3AF"
            value={snapchatUsername}
            onChangeText={setSnapchatUsername}
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoading}
          />
          <Text className="text-gray-500 text-xs mt-1">
            This is how matches will connect with you
          </Text>
        </View>

        {/* Complete Button */}
        <TouchableOpacity
          onPress={handleComplete}
          className={`px-8 py-4 rounded-full ${
            lookingFor && snapchatUsername.trim() && !isLoading
              ? "bg-primary"
              : "bg-gray-300"
          }`}
          activeOpacity={0.8}
          disabled={!lookingFor || !snapchatUsername.trim() || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-semibold text-center text-lg">
              Complete Profile
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
