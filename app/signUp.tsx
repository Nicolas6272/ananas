import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "~/context/authContext";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { register } = useAuth();

  const handleRegister = async () => {
    await register(username, email, password);
  };

  return (
    <View className="flex h-full w-full bg-green-400 pt-[12%]">
      <StatusBar style="dark" />
      <View className="flex h-full w-full items-center justify-center bg-purple-400">
        <View className="flex w-2/3 items-center justify-center gap-8">
          <Text>SIGNUP PAGE</Text>
          <View className="flex w-full gap-4">
            <TextInput
              className="h-8 w-full rounded-md border border-black bg-white px-2"
              onChangeText={value => setUsername(value)}
              value={username}
              placeholder="Username"
            />
            <TextInput
              className="h-8 w-full rounded-md border border-black bg-white px-2"
              onChangeText={value => setEmail(value)}
              value={email}
              placeholder="Email"
            />
            <TextInput
              className="h-8 w-full rounded-md border border-black bg-white px-2 "
              onChangeText={value => setPassword(value)}
              value={password}
              placeholder="Password"
            />
          </View>
          <TouchableOpacity
            onPress={handleRegister}
            className="rounded-lg bg-white p-2">
            <Text>SIGN UP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.navigate("signIn")}
            className="rounded-lg bg-white p-2">
            <Text>SIGN IN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
