import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateRegistrationForm } from "@/lib/validation";
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
