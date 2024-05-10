import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import TestPage from "./src/TestPage";

const App = () => {
  return (
    <View>
      <StatusBar style="auto" />
      <TestPage />
    </View>
  );
};

export default App;
