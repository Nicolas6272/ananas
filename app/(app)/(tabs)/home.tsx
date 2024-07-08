import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "~/context/authContext";

export default function HomePage() {
  const { logout, user } = useAuth();
  console.log("🚀 ~ HomePage ~ user:", user);
  const handleLogout = async () => {
    await logout();
  };

  return (
    <View className="flex h-full items-center justify-center gap-4 bg-blue-500">
      <Text>Bonjour {user?.username}</Text>
      <TouchableOpacity
        onPress={handleLogout}
        className="rounded-lg bg-white p-2">
        <Text>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
}
