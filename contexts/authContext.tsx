"use client";
import React, { createContext, useContext } from "react";
import { authClient } from "@/lib/auth-client";
import { AuthContextType } from "@/types/auth-context";

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  refetch: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Use better-auth's useSession hook with refetch
  const { data: session, isPending, refetch } = authClient.useSession();
  return (
    <AuthContext.Provider
      value={{
        user: session?.user ?? null,
        session: session?.session ?? null,
        loading: isPending,
        refetch: async () => {
          await refetch();
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
