import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { posts } from "../constants/dummy-data";

export default function HomeScreen() {
  return (
    <View className="bg-gray-100 flex-1 p-4">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white p-4 mb-4 rounded-xl shadow-lg">
            <Text className="text-lg font-bold text-gray-800">{item.id}</Text>
            <Text className="text-gray-600 mt-2">{item.content}</Text>
            <TouchableOpacity
              className="bg-blue-500 mt-4 p-3 rounded-lg"
              onPress={() => console.log(`Open comments for ${item.id}`)}
            >
              <Text className="text-white text-center font-medium">
                Open Discussion
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
