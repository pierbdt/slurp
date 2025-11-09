import { View, Text, TouchableOpacity } from "react-native";
import { User, Settings } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="pt-16 pb-4 px-6 bg-background border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-text">Profile</Text>
          <TouchableOpacity>
            <Settings size={24} color="#424242" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 items-center justify-center">
        <View className="items-center">
          <View className="w-24 h-24 bg-gray-200 rounded-full items-center justify-center mb-4">
            <User size={48} color="#9CA3AF" />
          </View>
          <Text className="text-2xl font-bold text-text mb-2">
            Your Profile
          </Text>
          <Text className="text-gray-500 text-center px-8 mb-8">
            Profile setup coming soon...
          </Text>

          {/* Temporary Logout Button */}
          <TouchableOpacity
            onPress={() => router.replace("/")}
            className="bg-gray-200 px-8 py-3 rounded-full"
            activeOpacity={0.8}
          >
            <Text className="text-text font-semibold">
              Back to Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
