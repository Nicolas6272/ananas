import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signInAnonymously } from "firebase/auth";

import { createUser } from "~/db/users";

export const makeFirstConnection = async () => {
  const auth = getAuth();
  const isFirstConnection = await AsyncStorage.getItem("isFirstConnection");

  if (isFirstConnection === "true") {
    await signInAnonymously(auth)
      .then(async (userCredential) => {
        const uuid = userCredential.user.uid;
        await createUser(uuid);
        console.log("User created successfully");
      })
      .catch((error) => {
        console.error("Error in signInAnonymously: ", error);
      });
    await AsyncStorage.setItem("isFirstConnection", "false");
  }
};
