import { Text, View } from "react-native";
import ButtonPrimary from "~/components/atoms/button/ButtonPrimary";
import { useAuth } from "~/context/authContext";

export default function HomePage() {
  const { logout, user } = useAuth();
  const handleLogout = async () => {
    await logout();
  };

  return (
    <View className="flex h-full items-center justify-center bg-blue-500">
      <Text>Bonjour {user?.username}</Text>
      <ButtonPrimary />
    </View>
  );
}
