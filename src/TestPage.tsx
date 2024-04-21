import { FC } from "react";
import { Text, View } from "react-native";

const TestPage: FC = () => {
  return (
    <View className="flex items-center justify-center bg-blue-500 p-3">
      <Text className="text-white">Hello World</Text>
    </View>
  );
};

export default TestPage;
