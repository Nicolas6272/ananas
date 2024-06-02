import { FC } from "react";
import { Text, View } from "react-native";

const HomePage: FC = () => {
  return (
    <View className="flex h-screen items-center justify-center bg-blue-500 p-3">
      <Text className="text-white">Bonsoir</Text>
    </View>
  );
};

export default HomePage;
