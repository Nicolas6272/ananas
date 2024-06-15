import { Slot } from "expo-router";
import { StatusBar } from "react-native";
import { SessionProvider } from "../ctx";

export default function Root() {
  return (
    <SessionProvider>
      <StatusBar backgroundColor="blue" />
      <Slot />
    </SessionProvider>
  );
}
