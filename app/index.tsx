import { useRef, useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { posts } from "../constants/dummy-data";
import CommentSectionSheet from "../components/CommentSectionSheet";

export default function HomeScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  const handleOpen = (newReferenceId: string) => {
    if (bottomSheetRef.current) {
      setReferenceId(newReferenceId);
      bottomSheetRef.current.expand(); // `expand` method now has TypeScript autocomplete
    }
  };

  const handleClose = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
      setReferenceId(null);
    }
  };

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
              onPress={() => handleOpen(item.id)}
            >
              <Text className="text-white text-center font-medium">
                Open Discussion
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <CommentSectionSheet
        ref={bottomSheetRef}
        referenceId={referenceId}
        handleClose={handleClose}
      />
    </View>
  );
}
