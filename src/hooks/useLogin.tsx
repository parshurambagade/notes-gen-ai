import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { validateLoginForm } from "@/lib/validation";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export const useLogin = () => {
  const supabase = createClient();
  const [email, setEmail] = useState("zengreider1@ysosirius.com");
  const [password, setPassword] = useState("Test@123");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const searchParams = useSearchParams();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { isValid, error: validationError } = validateLoginForm(
        email,
        password
      );

      if (validationError) {
        toast.error(validationError);
        return;
      }

      if (!isValid) {
        toast.error(validationError || "Invalid email or password");
        return;
      }

      const { data, error: supabaseError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (supabaseError) {
        toast.error(supabaseError.message);
      }

      if (data.user) {
        toast.success("Logged in successfully");
        router.replace("/");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
