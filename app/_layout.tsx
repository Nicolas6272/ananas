import { Slot, router, useSegments } from "expo-router";
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
      <MainLayout />
    </AuthContextProvider>
  );
}
