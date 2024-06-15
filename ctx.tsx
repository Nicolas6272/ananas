import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import { useStorageState } from "./useStorageState";

const AuthContext = React.createContext<{
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => Promise.resolve(false),
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const signIn = async (email: string, password: string) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password,
      );
      setSession(credentials.user.uid);
      return true;
    } catch (e) {
      alert("Invalid email or password");
      return false;
    }
  };
  const signOut = () => {
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
