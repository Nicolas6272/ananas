import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { Stack } from "expo-router";
import { AuthContextProvider } from "~/context/authContext";

const MainLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <GluestackUIProvider config={config}>
        <MainLayout />
      </GluestackUIProvider>
    </AuthContextProvider>
  );
}
