import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateRegistrationForm } from "@/lib/validation";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export const useRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const supabase = await createClient();
      const { isValid, error: validationError } = validateRegistrationForm(
        name,
        email,
        password
      );

      if (!isValid) {
        setError(validationError || null);
        return;
      }

      setIsLoading(true);
      const { data, error: supabaseError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (supabaseError) {
        setError(supabaseError.message || null);
        setIsLoading(false);
        return;
      }

      if (data.user) {
        toast.success("Account created successfully");
        router.push("/");
      }
    } catch (error) {
      toast.error("An error occurred while creating your account");
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      setIsLoading(false);
      return;
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
