import { Text, TextInput, View } from "react-native";

import { router } from "expo-router";
import { useState } from "react";
import { useSession } from "../ctx";

export default function SignIn() {
  const { signIn } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    const SignInWORK = await signIn(email, password);
    if (SignInWORK) {
      router.replace("/");
    }
  };

  return (
    <View className="flex h-screen items-center justify-center gap-4 bg-black p-3">
      <TextInput
        placeholder="Email"
        onChangeText={(text: string) => setEmail(text)}
        value={email}
        className="w-1/2 rounded-md bg-white p-2"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        onChangeText={(text: string) => setPassword(text)}
        value={password}
        className="w-1/2 rounded-md bg-white p-2"
        autoCapitalize="none"
      />
      <Text
        className="rounded-md bg-blue-500 p-2 text-white"
        onPress={handleSignIn}>
        Sign In
      </Text>
    </View>
  );
}
