import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useUserStore } from "@/store/userStore";

export default function Settings() {
  const router = useRouter();
  const { user, updateProfile, isLoading } = useUserStore();

  const [name, setName] = useState(user?.name || "");

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Name cannot be empty");
      return;
    }

    try {
      await updateProfile(name);
      Alert.alert(
        "Success!",
        "Your profile has been updated",
        [{ text: "OK", onPress: () => router.back() }]
      );
    } catch (err: any) {
      Alert.alert("Update Failed", err.message || "Could not update profile");
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <View className="pt-16 pb-4 px-6 bg-background border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <ChevronLeft size={28} color="#424242" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-text">Settings</Text>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 px-8 pt-6">
        {/* Form */}
        <View>
          {/* Name Input */}
          <View className="mb-4">
            <Text className="text-gray-700 mb-2 font-medium">Name</Text>
            <TextInput
              className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-text"
              placeholder="Enter your name"
              placeholderTextColor="#9CA3AF"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              editable={!isLoading}
            />
          </View>

          {/* Email Display (non-editable) */}
          <View className="mb-6">
            <Text className="text-gray-700 mb-2 font-medium">Email</Text>
            <View className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3">
              <Text className="text-gray-500">{user?.email}</Text>
            </View>
            <Text className="text-gray-500 text-xs mt-1">
              Email cannot be changed
            </Text>
          </View>

          {/* Save Button */}
          <TouchableOpacity
            onPress={handleSave}
            className="bg-primary px-8 py-4 rounded-full"
            activeOpacity={0.8}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-semibold text-center text-lg">
                Save Changes
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
