import { View, Text, TouchableOpacity, Alert } from "react-native";
import { User, Settings, LogOut } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useUserStore } from "@/store/userStore";

export default function Profile() {
  const router = useRouter();
  const { user, signOut } = useUserStore();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await signOut();
              router.replace("/");
            } catch (error) {
              Alert.alert("Error", "Failed to logout");
            }
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="pt-16 pb-4 px-6 bg-background border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-text">Profile</Text>
          <TouchableOpacity onPress={() => router.push("/settings")}>
            <Settings size={24} color="#424242" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 items-center justify-center">
        <View className="items-center">
          <View className="w-24 h-24 bg-primary rounded-full items-center justify-center mb-4">
            <User size={48} color="#FFFFFF" />
          </View>

          {/* User Info */}
          <Text className="text-2xl font-bold text-text mb-2">
            {user?.name || "User"}
          </Text>
          <Text className="text-gray-500 mb-8">
            {user?.email}
          </Text>

          <Text className="text-gray-500 text-center px-8 mb-8">
            Profile customization coming soon...
          </Text>

          {/* Logout Button */}
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-500 px-8 py-3 rounded-full flex-row items-center"
            activeOpacity={0.8}
          >
            <LogOut size={20} color="#FFFFFF" />
            <Text className="text-white font-semibold ml-2">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
