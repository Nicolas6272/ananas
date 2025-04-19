// src/layouts/RootLayout.js
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import * as BackgroundTask from "expo-background-task";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as TaskManager from "expo-task-manager";
import { useEffect } from "react";

import { AuthContextProvider } from "~/context/authContext";
const BACKGROUND_TASK_IDENTIFIER = "background-task";

TaskManager.defineTask(BACKGROUND_TASK_IDENTIFIER, async () => {
  try {
    const now = Date.now();
    console.log(
      `Got background task call at date: ${new Date(now).toISOString()}`,
    );
  } catch (error) {
    console.error("Failed to execute the background task:", error);
    return BackgroundTask.BackgroundTaskResult.Failed;
  }
  return BackgroundTask.BackgroundTaskResult.Success;
});

async function registerBackgroundTaskAsync() {
  return BackgroundTask.registerTaskAsync(BACKGROUND_TASK_IDENTIFIER);
}

export default function RootLayout() {
  // Register the background task when the app starts
  useEffect(() => {
    registerBackgroundTaskAsync();
  }, []);

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
