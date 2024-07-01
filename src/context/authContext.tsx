import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsAuthenticated(false);
    }, 1000);
  }, []);

  const login = async (email, passwowrd) => {
    try {
      console.log("Logging in");
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async (email, password) => {
    try {
      console.log("Logging out");
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (email, password) => {
    try {
      console.log("Registering");
    } catch (error) {
      console.error(error);
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
