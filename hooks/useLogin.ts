import { useState } from "react";
import { redirect } from "next/navigation";
import { validateLoginForm } from "@/utils/validation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/contexts/authContext";
export const useLogin = () => {
  const [email, setEmail] = useState("zengreider1@ysosirius.com");
  const [password, setPassword] = useState("Test@123");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { refetch } = useAuth();

  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError(null);

  //   const validation = validateLoginForm(email, password);
  //   if (!validation.isValid) {
  //     setError(validation.error || "Validation failed");
  //     return;
  //   }

  //   setIsLoading(true);

  //   try {
  //     const { error, data } = await authClient.signIn.email({
  //       email,
  //       password,
  //     });

  //     if (error) {
  //       throw new Error(error.message);
  //     } else if (data.user) {
  //       setEmail("");
  //       setPassword("");

  //       // Show success toast
  //       toast.success("Welcome back!", {
  //         description: "You have been successfully logged in.",
  //       });

  //       // 🔧 Wait for auth state to be properly set
  //       await new Promise((resolve) => setTimeout(resolve, 100));

  //       // Force a page refresh to ensure auth state is updated
  //       const redirectTo = searchParams.get("redirectTo") || "/";

  //       // 🔧 Use window.location for more reliable redirect in production
  //       window.location.href = redirectTo;
  //     }
  //   } catch (error) {
  //     console.error("Error logging in:", error);
  //     const errorMessage =
  //       error instanceof Error
  //         ? error.message
  //         : "An error occurred while logging in. Please try again.";
  //     setError(errorMessage);

  //     // Also show error toast
  //     toast.error("Login failed", {
  //       description: errorMessage,
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const validation = validateLoginForm(email, password);
    if (!validation.isValid) {
      setError(validation.error || "Validation failed");
      return;
    }

    setIsLoading(true);
    await authClient.signIn.email(
      {
        email,
        password,
        rememberMe: true,
      },
      {
        onRequest: (ctx) => {
          setIsLoading(true);
        },
        onSuccess: async (ctx) => {
          toast.success("Login successful", {
            description: "You have been successfully logged in.",
          });

          // Refetch the auth context
          await refetch();

          redirect("/notes/all");
        },
        onError: (ctx) => {
          setError(ctx?.error?.message ?? "Unknown error");
          toast.error("Login failed", {
            description:
              ctx?.error?.message ?? "Error logging in. Please try again.",
          });
        },
      }
    );

    setIsLoading(false);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    isLoading,
    error,
  };
};
