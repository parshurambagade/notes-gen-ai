"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  className?: string;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

const BackButton: React.FC<BackButtonProps> = ({
  className = "",
  variant = "outline",
  size = "sm",
}) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleBack}
      className={`flex items-center gap-2 cursor-pointer ${className}`}
      aria-label="Go back"
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="hidden md:flex">Back</span>
    </Button>
  );
};

export default BackButton;
