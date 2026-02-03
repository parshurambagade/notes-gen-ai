"use client";

import { AuthProvider } from "@/contexts/auth-context";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";

export function AuthProviderWrapper({ children }: { children: ReactNode }) {
  const supabase = useMemo(() => createClient(), []);
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initial load + re-sync session when route changes (fixes "logged in but shows login" on client-side nav)
  useEffect(() => {
    let mounted = true;

    const syncSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (mounted) {
        setUser(session?.user ?? null);
      }
      if (mounted) setIsLoading(false);
    };

    syncSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setUser(session?.user ?? null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  // Re-sync session on client-side navigation so protected pages see the user
  useEffect(() => {
    if (isLoading) return;
    let mounted = true;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        setUser(session?.user ?? null);
      }
    });
    return () => {
      mounted = false;
    };
  }, [pathname, isLoading, supabase]);

  return <AuthProvider value={{ user, isLoading }}>{children}</AuthProvider>;
}
