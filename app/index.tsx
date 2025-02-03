import { useRef, useState } from "react";
import { View, FlatList } from "react-native";
import { EntityProvider } from "@replyke/expo";
import BottomSheet from "@gorhom/bottom-sheet";
import { posts } from "../constants/dummy-data";
import CommentSectionSheet from "../components/CommentSectionSheet";
import SinglePost from "../components/SinglePost";

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
          <EntityProvider referenceId={item.id} createIfNotFound key={item.id}>
            <SinglePost item={item} handleOpen={handleOpen} />
          </EntityProvider>
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
