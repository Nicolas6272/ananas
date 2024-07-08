import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCT_fu6UY7iY-RdkX15oFXHsxBPu0BSmyg",
  authDomain: "ananas-4f5c6.firebaseapp.com",
  projectId: "ananas-4f5c6",
  storageBucket: "ananas-4f5c6.appspot.com",
  messagingSenderId: "274428610478",
  appId: "1:274428610478:web:b013f161d2267bd3dd6a3f",
  measurementId: "G-WJ87YEL6J9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const playersCollection = collection(db, "players");
