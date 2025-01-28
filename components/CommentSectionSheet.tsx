import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { View, Text, Platform, KeyboardAvoidingView } from "react-native";
import {
  useSocialComments,
  useSocialStyle,
  UseSocialStyleProps,
} from "replyke-expo";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

const CommentSectionSheet = forwardRef<
  BottomSheet,
  { referenceId: string | null; handleClose: () => void }
>(
  (
    {
      referenceId,
      handleClose,
    }: { referenceId: string | null; handleClose: () => void },
    ref
  ) => {
    const snapPoints = useMemo(() => ["100%"], []);

    const customStyles = useMemo<Partial<UseSocialStyleProps>>(
      () => ({
        commentProps: {},
        newCommentFormProps: {
          verticalPadding: 16,
          paddingLeft: 24,
          paddingRight: 24,
        },
      }),
      []
    );
    const styleConfig = useSocialStyle(customStyles);

    const {
      CommentSectionProvider,
      CommentsFeed,
      NewCommentForm,
      SortByButton,
    } = useSocialComments({
      referenceId,
      styleConfig,
      createIfNotFound: true,
      callbacks: {
        loginRequiredCallback: () => {
          alert(
            "Oops! Login Required. Please sign in or create an account to continue."
          );
        },
      },
    });

    const commentFormRef = useRef<{ focus: () => void } | null>(null);

    useEffect(() => {
      if (!referenceId) return;
      const timeout = setTimeout(() => {
        if (commentFormRef.current) {
          commentFormRef.current.focus();
        }
      }, 1000);
      return () => clearTimeout(timeout);
    }, [referenceId]);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      []
    );
    return (
      <BottomSheet
        index={-1}
        ref={ref} // Forwarding the ref here
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        onClose={handleClose}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <CommentSectionProvider>
            <BottomSheetView className="relative flex-1 h-full">
              <View className="flex-row gap-2 px-4 items-center mb-2">
                <View className="flex-1" />
                <SortByButton
                  priority="top"
                  activeView={
                    <Text className="bg-black py-2 px-3 rounded-md text-white text-sm">
                      Top
                    </Text>
                  }
                  nonActiveView={
                    <Text className="bg-gray-200 py-2 px-3 rounded-md text-sm">
                      Top
                    </Text>
                  }
                />
                <SortByButton
                  priority="new"
                  activeView={
                    <Text className="bg-black py-2 px-3 rounded-md text-white text-sm">
                      New
                    </Text>
                  }
                  nonActiveView={
                    <Text className="bg-gray-200 py-2 px-3 rounded-md text-sm">
                      New
                    </Text>
                  }
                />
              </View>

              <CommentsFeed />
              {/* <View className="border-t-hairline border-gray-300"> */}
              <NewCommentForm ref={commentFormRef} />
              {/* </View> */}
            </BottomSheetView>
          </CommentSectionProvider>
        </KeyboardAvoidingView>
      </BottomSheet>
    );
  }
);

export default CommentSectionSheet;
