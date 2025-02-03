import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useEntity } from "@replyke/expo";

const SinglePost = ({
  item,
  handleOpen,
}: {
  item: { id: string; content: string };
  handleOpen: (newReferenceId: string) => void;
}) => {
  const {
    entity,
    userDownvotedEntity,
    userUpvotedEntity,
    upvoteEntity,
    removeEntityUpvote,
    downvoteEntity,
    removeEntityDownvote,
  } = useEntity();

  const upvotesCount = entity?.upvotes.length || 0;
  const downvotesCount = entity?.downvotes.length || 0;

  const handleUpvote = () => {
    if (userUpvotedEntity) {
      removeEntityUpvote?.();
    } else {
      upvoteEntity?.();
    }
  };

  const handleDownvote = () => {
    if (userDownvotedEntity) {
      removeEntityDownvote?.();
    } else {
      downvoteEntity?.();
    }
  };

  return (
    <View className="bg-white p-4 mb-4 rounded-xl shadow-lg">
      {/* Post Content */}
      <Text className="text-lg font-bold text-gray-800">{item.id}</Text>
      <Text className="text-gray-600 mt-2">{item.content}</Text>

      {/* Voting Section */}
      <View className="flex-row justify-between items-center mt-4">
        {/* Upvote Button */}
        <TouchableOpacity
          className={`flex-row items-center p-3 rounded-lg ${
            userUpvotedEntity ? "bg-green-500" : "bg-gray-200"
          }`}
          onPress={handleUpvote}
        >
          <Text
            className={`font-medium ${
              userUpvotedEntity ? "text-white" : "text-gray-800"
            }`}
          >
            {userUpvotedEntity ? "Upvoted" : "Upvote"}
          </Text>
          <Text className="ml-2 text-sm text-gray-600">({upvotesCount})</Text>
        </TouchableOpacity>

        {/* Downvote Button */}
        <TouchableOpacity
          className={`flex-row items-center p-3 rounded-lg ${
            userDownvotedEntity ? "bg-red-500" : "bg-gray-200"
          }`}
          onPress={handleDownvote}
        >
          <Text
            className={`font-medium ${
              userDownvotedEntity ? "text-white" : "text-gray-800"
            }`}
          >
            {userDownvotedEntity ? "Downvoted" : "Downvote"}
          </Text>
          <Text className="ml-2 text-sm text-gray-600">({downvotesCount})</Text>
        </TouchableOpacity>
      </View>

      {/* Open Discussion Button */}
      <TouchableOpacity
        className="bg-blue-500 mt-4 p-3 rounded-lg"
        onPress={() => handleOpen(item.id)}
      >
        <Text className="text-white text-center font-medium">
          Open Discussion ({entity?.repliesCount})
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SinglePost;
