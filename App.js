import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import TestPage from "./src/testPage";

export default function App() {
  return (
    <View className="h-full flex items-center justify-center">
      <TestPage />
      <StatusBar style="auto" />
    </View>
  );
}
