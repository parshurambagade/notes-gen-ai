import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { validateRegistrationForm } from "@/utils/validation";
import { toast } from "sonner";

export const useRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation using utility function
    const validation = validateRegistrationForm(name, email, password);
    if (!validation.isValid) {
      setError(validation.error || "Validation failed");
      return;
    }

    setIsLoading(true);

    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: name,
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.user) {
        // Check for session
        const session = (await supabase.auth.getSession()).data.session;
        if (!session) {
          throw new Error("No session found after registration");
        }

        // Show success toast
        toast.success("Account created successfully!", {
          description: "Welcome to NotesGen AI! You're now logged in.",
          duration: 4000,
        });

        // Clear form
        setName("");
        setEmail("");
        setPassword("");

        // Redirect to home page
        router.push("/");
      } else {
        throw new Error("No user data returned");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.";
      setError(errorMessage);

      // Show error toast
      toast.error("Registration failed", {
        description: errorMessage,
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setError(null); // Clear error when user starts typing

    switch (id) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  return {
    name,
    email,
    password,
    isLoading,
    error,
    handleRegister,
    handleInputChange,
  };
};
