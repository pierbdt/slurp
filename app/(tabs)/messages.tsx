import { View, Text } from "react-native";
import { MessageCircle } from "lucide-react-native";

export default function Messages() {
  return (
    <View className="flex-1 bg-background items-center justify-center">
      {/* Header */}
      <View className="absolute top-0 left-0 right-0 pt-16 pb-4 px-6 bg-background border-b border-gray-200">
        <Text className="text-2xl font-bold text-text">Messages</Text>
      </View>

      {/* Content */}
      <View className="items-center">
        <MessageCircle size={64} color="#FF4458" />
        <Text className="text-2xl font-bold text-text mt-6 mb-2">
          Start Chatting
        </Text>
        <Text className="text-gray-500 text-center px-8">
          Your conversations will appear here...
        </Text>
      </View>
    </View>
  );
}
