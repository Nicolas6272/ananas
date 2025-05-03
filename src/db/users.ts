import { addDoc, collection } from "firebase/firestore";

import { db } from "../db/firebaseConfig";

import { type User } from "~/types";

export const createUser = async (token: string) => {
  const userCollection = collection(db, "user");
  const newUser: User = {
    fcmToken: token,
    favoritePlayers: [],
  };
  try {
    await addDoc(userCollection, newUser);
  } catch (error) {
    console.error("Error creating user: ", error);
  }
};
