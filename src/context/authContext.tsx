import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createUserWithEmailAndPassword,
  getReactNativePersistence,
  initializeAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FC, createContext, useContext, useEffect, useState } from "react";
import { app, db } from "~/db/firebaseConfig";
import { User } from "~/types";

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, passwowrd: string) => Promise<AuthFunctionReturnType>;
  logout: () => Promise<AuthFunctionReturnType>;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<AuthFunctionReturnType>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthFunctionReturnType = {
  success: boolean;
  error?: any;
  data?: any;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (user) {
        setIsAuthenticated(true);
        // setUser(user);
        updateUserData(user.uid);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
  }, []);

  const updateUserData = async (userId: string) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const user = docSnap.data();
      setUser(user as User);
    } else {
      console.log("No such document!");
    }
  };

  const login = async (
    email: string,
    passwowrd: string,
  ): Promise<AuthFunctionReturnType> => {
    try {
      await signInWithEmailAndPassword(auth, email, passwowrd);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const logout = async (): Promise<AuthFunctionReturnType> => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string,
  ): Promise<AuthFunctionReturnType> => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await setDoc(doc(db, "users", response.user.uid), {
        username,
        userId: response?.user?.uid,
      });

      return { success: true, data: response?.user };
    } catch (error) {
      return { success: false, error };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        register,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used within a AuthContextProvider");
  }
  return value;
};
