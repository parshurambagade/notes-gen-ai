import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { validateRegistrationForm } from "@/utils/validation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

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

    await authClient.signUp.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
      },
      {
        onRequest: (ctx) => {
          //show loading
          setIsLoading(true);
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
          toast.success("Account created successfully!", {
            description: "Welcome to NotesGen AI! You're now logged in.",
            duration: 4000,
          });
          redirect("/notes/all");
        },
        onError: (ctx) => {
          // display the error message
          toast.error(
            `Registration failed: ${ctx?.error?.message ?? "Unknown error"}`
          );
        },
      }
    );

    setIsLoading(false);
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
