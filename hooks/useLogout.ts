import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import useSavedNotesStore from "@/stores/saved-notes-store";
import useRecentlyGeneratedNotesStore from "@/stores/recently-generated-notes-store";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/contexts/authContext";

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { refetch } = useAuth();
  const { clearSavedNotes } = useSavedNotesStore();
  const { clearGeneratedNotes } = useRecentlyGeneratedNotesStore();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onRequest: (ctx) => {
          setIsLoading(true);
        },
        onSuccess: async (ctx) => {
          toast.success("Logged out successfully", {
            description: "You have been logged out. See you next time!",
          });
          // Clear both stores on logout
          clearSavedNotes();
          clearGeneratedNotes();

          // Refetch the auth context
          await refetch();
          setIsLoading(false);
          // Redirect to login page
          redirect("/auth/login");
        },
        onError: (ctx) => {
          toast.error("Logout failed", {
            description:
              "There was an error logging you out. Please try again.",
            duration: 4000,
          });
        },
      },
    });

    setIsLoading(false);
  };

  return {
    handleLogout,
    isLoading,
  };
};
