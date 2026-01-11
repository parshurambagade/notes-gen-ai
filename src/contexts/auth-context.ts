"use client";

import { createContext, useContext } from "react";
import { User } from "@supabase/supabase-js";

export interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

export const AuthProvider = AuthContext.Provider;
export default AuthContext;
