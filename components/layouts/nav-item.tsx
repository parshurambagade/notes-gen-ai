"use client";

import type React from "react";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}

export default function NavItem({ href, isActive, children }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
        isActive ? "text-violet-700" : "text-gray-600 hover:text-gray-900"
      )}
    >
      <span className="relative z-10">{children}</span>
    </Link>
  );
}
