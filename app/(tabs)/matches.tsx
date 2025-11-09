import { View, Text } from "react-native";
import { Heart } from "lucide-react-native";

export default function Matches() {
  return (
    <View className="flex-1 bg-background items-center justify-center">
      {/* Header */}
      <View className="absolute top-0 left-0 right-0 pt-16 pb-4 px-6 bg-background border-b border-gray-200">
        <Text className="text-2xl font-bold text-text">Matches</Text>
      </View>

      {/* Content */}
      <View className="items-center">
        <Heart size={64} color="#FF4458" />
        <Text className="text-2xl font-bold text-text mt-6 mb-2">
          Your Matches
        </Text>
        <Text className="text-gray-500 text-center px-8">
          Your matches will appear here...
        </Text>
      </View>
    </View>
  );
}
