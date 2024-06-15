import { Text, View } from "react-native";
import { useSession } from "../../../ctx";

export default function FavPage() {
  const { signOut } = useSession();
  return (
    <View className="flex h-full items-center justify-center bg-red-500">
      <Text>Fav</Text>
      <Text onPress={signOut}>Click me!</Text>
    </View>
  );
}
