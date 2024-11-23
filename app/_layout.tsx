// src/layouts/RootLayout.js
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { AuthContextProvider } from "~/context/authContext";

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <GluestackUIProvider config={config}>
        <StatusBar style="dark" />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </GluestackUIProvider>
    </AuthContextProvider>
  );
}
