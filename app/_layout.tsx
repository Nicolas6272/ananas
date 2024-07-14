import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { Slot, router, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { AuthContextProvider, useAuth } from "~/context/authContext";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segements = useSegments();

  useEffect(() => {
    // check if the user is authenticated
    if (typeof isAuthenticated === "undefined") return;
    const inApp = segements.includes("(app)");

    if (isAuthenticated && !inApp) {
      router.replace("home");
    } else if (!isAuthenticated && inApp) {
      router.replace("signIn");
    } else {
      router.replace("signIn");
    }
  }, [isAuthenticated]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <StatusBar style="dark" />
      <GluestackUIProvider config={config}>
        <MainLayout />
      </GluestackUIProvider>
    </AuthContextProvider>
  );
}
