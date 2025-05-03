// src/layouts/RootLayout.js
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";

import { makeFirstConnection } from "~/auth/auth";

export default function RootLayout() {
  useEffect(() => {
    AsyncStorage.setItem("isFirstConnection", "true");
    makeFirstConnection();
  }, []);

  return (
    <GluestackUIProvider config={config}>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </GluestackUIProvider>
  );
}
