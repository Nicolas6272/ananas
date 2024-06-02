import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FC, useState } from "react";
import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  TextInput,
  View,
} from "react-native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

const LoginPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const login = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.error(error);
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const register = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View className="flex h-screen items-center justify-center gap-4 bg-black p-3">
      <KeyboardAvoidingView>
        <TextInput
          placeholder="Email"
          onChangeText={(text: string) => setEmail(text)}
          value={email}
          className="w-1/2 rounded-md bg-white p-2"
        />
        <TextInput
          placeholder="Password"
          onChangeText={(text: string) => setPassword(text)}
          value={password}
          className="w-1/2 rounded-md bg-white p-2"
        />
        {loading ? (
          <ActivityIndicator color="black" />
        ) : (
          <>
            <Button title="Login" onPress={login} />
            <Button title="Register" onPress={register} />
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginPage;
