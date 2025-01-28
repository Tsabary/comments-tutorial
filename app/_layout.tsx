import "../global.css";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ReplykeProvider, TokenManager, useSignTestingJwt } from "replyke-expo";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { users } from "../constants/dummy-data";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const projectId = process.env.EXPO_PUBLIC_REPLYKE_PROJECT_ID!;
const privateKey = process.env.EXPO_PUBLIC_REPLYKE_SECRET_KEY!;

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const signTestingJwt = useSignTestingJwt();

  const [signedToken, setSignedToken] = useState<string>();

  const handleSignJwt = async () => {
    const payload = users[0];

    const token = await signTestingJwt({
      projectId,
      payload,
      privateKey,
    });
    // Set the signed JWT in the state
    setSignedToken(token);
  };

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    handleSignJwt();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <ReplykeProvider projectId={projectId} signedToken={signedToken}>
        <TokenManager />
        <SafeAreaProvider>
          <SafeAreaView className="flex-1">
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
          </SafeAreaView>
          <StatusBar style="dark" />
        </SafeAreaProvider>
      </ReplykeProvider>
    </GestureHandlerRootView>
  );
}
