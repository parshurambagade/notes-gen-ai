"use client";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  Suspense,
} from "react";
import { Session, User, AuthChangeEvent } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") {
      setLoading(false);
      return;
    }

    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setSession(session);
        setUser(session?.user ? session.user : null);
        setLoading(false);

        // // 🔧 Force router refresh on auth change in production
        // if (typeof window !== "undefined") {
        //   // Small delay to ensure state is updated
        //   setTimeout(() => {
        //     window.location.reload();
        //   }, 100);
        // }
      }
    );

    return () => listener?.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, loading }}>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
