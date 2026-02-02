import { createClient } from "@/lib/supabase/client";
import { useGlobalStore } from "@/stores/global-store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const useLogout = () => {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  const { clearStore } = useGlobalStore();

  const router = useRouter();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Logged out successfully");
        clearStore();
        router.replace("/auth/login");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleLogout,
    isLoading,
  };
};

export default useLogout;
