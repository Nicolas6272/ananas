import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "~/context/authContext";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    const response = await login(email, password);
    if (!response.success) console.log(response.error);
  };

  return (
    <View className="flex h-full w-full bg-green-400 pt-[12%]">
      <View className="flex h-full w-full items-center justify-center bg-blue-400">
        <View className="flex w-2/3 items-center justify-center gap-8">
          <Text>SIGNIN PAGE</Text>
          <View className="flex w-full gap-4">
            <TextInput
              className="h-8 w-full rounded-md border border-black bg-white"
              onChangeText={value => setEmail(value)}
              value={email}
              placeholder="Email"
            />
            <TextInput
              className="h-8 w-full rounded-md border border-black bg-white"
              onChangeText={value => setPassword(value)}
              value={password}
              placeholder="Password"
            />
          </View>
          <TouchableOpacity
            onPress={handleLogin}
            className="rounded-lg bg-white p-2">
            <Text>SIGN IN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.navigate("signUp")}
            className="rounded-lg bg-white p-2">
            <Text>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
