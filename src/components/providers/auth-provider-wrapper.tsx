"use client";

import { AuthProvider, AuthContextType } from "@/contexts/auth-context";
import { ReactNode, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

export function AuthProviderWrapper({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // TODO: Fetch user from Supabase here if needed

  return <AuthProvider value={{ user }}>{children}</AuthProvider>;
}
