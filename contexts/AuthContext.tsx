import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useSegments } from "expo-router";

type User = {
  id: string;
  email: string;
  nombre: string;
  // Agrega más campos según tu API
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  signIn: (token: string, user: User) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    loadStoredData();
  }, []);

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";
    if (!token && !inAuthGroup) {
      // Redirigir a login si no hay token
      router.replace("/(auth)/login");
    } else if (token && inAuthGroup) {
      // Redirigir a área protegida si hay token
      router.replace("/(protected)");
    }
  }, [token, segments]);

  const loadStoredData = async () => {
    try {
      const [storedToken, storedUser] = await Promise.all([
        AsyncStorage.getItem("token"),
        AsyncStorage.getItem("user"),
      ]);

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error loading stored data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (newToken: string, userData: User) => {
    try {
      await Promise.all([
        AsyncStorage.setItem("token", newToken),
        AsyncStorage.setItem("user", JSON.stringify(userData)),
      ]);
      setToken(newToken);
      setUser(userData);
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem("token"),
        AsyncStorage.removeItem("user"),
      ]);
      setToken(null);
      setUser(null);
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut, isLoading }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
