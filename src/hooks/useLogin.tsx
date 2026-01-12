import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { validateLoginForm } from "@/lib/validation";
import { toast } from "sonner";

export const useLogin = () => {
  const [email, setEmail] = useState("zengreider1@ysosirius.com");
  const [password, setPassword] = useState("Test@123");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
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
