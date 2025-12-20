"use client";

import type React from "react";

// import { motion } from "framer-motion"
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MobileNavItemProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}

export default function MobileNavItem({
  href,
  isActive,
  children,
}: MobileNavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "block relative px-3 py-2.5 rounded-md text-base font-medium transition-all duration-200",
        isActive ? "bg-violet-50 text-violet-700" : "text-gray-600"
      )}
    >
      <span className="relative z-10">{children}</span>
    </Link>
  );
}
