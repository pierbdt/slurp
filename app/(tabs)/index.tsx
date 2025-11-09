import { View, Text } from "react-native";
import { Flame } from "lucide-react-native";

export default function Discover() {
  return (
    <View className="flex-1 bg-background items-center justify-center">
      {/* Header */}
      <View className="absolute top-0 left-0 right-0 pt-16 pb-4 px-6 bg-background border-b border-gray-200">
        <Text className="text-2xl font-bold text-text">Discover</Text>
      </View>

      {/* Content */}
      <View className="items-center">
        <Flame size={64} color="#FF4458" />
        <Text className="text-2xl font-bold text-text mt-6 mb-2">
          Swipe to Match
        </Text>
        <Text className="text-gray-500 text-center px-8">
          Card swipe interface coming soon...
        </Text>
      </View>
    </View>
  );
}
