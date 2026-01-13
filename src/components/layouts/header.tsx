"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import useLogout from "@/hooks/useLogout";

// Navigation items
const navigationItems = [
  { name: "Home", href: "/" },
  { name: "All Notes", href: "/notes/all" },
];
export default function MainHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  const { handleLogout, isLoading: isLoggingOut } = useLogout();
  // Close mobile menu when path changes

  return (
    <header
      className={
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out bg-white shadow-sm"
      }
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 min-w-max">
            <span className="font-bold text-xl bg-clip-text text-transparent bg-linear-to-r from-violet-500 to-indigo-600">
              NotesGen AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center space-x-1 w-full">
            <div>
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                      isActive
                        ? "text-primary"
                        : "text-gray-600 hover:text-gray-900"
                    )}
                  >
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
          {!user ? (
            <Link href={"/auth/login"} className="my-2 hidden md:flex">
              <Button variant={"outline"} className="cursor-pointer">
                Log In
              </Button>
            </Link>
          ) : (
            <div className="hidden md:flex">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex gap-2 items-center my-3 min-w-max cursor-pointer">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="User Avatar"
                    />
                    <AvatarFallback>
                      {user?.user_metadata?.display_name}
                    </AvatarFallback>
                  </Avatar>
                  <p>{user?.user_metadata?.display_name}</p>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="cursor-pointer flex justify-center items-center gap-2"
                    onClick={() => handleLogout()}
                    disabled={isLoggingOut}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleLogout();
                      }
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden my-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="py-4 space-y-1 shadow-b-lg border-b-2 ">
            {/* Mobile Nav Links - Now with animated mobile nav items */}
            {!user ? (
              <Link
                href={"/auth/login"}
                className="mb-4 flex justify-center w-full md:hidden"
              >
                <Button
                  variant={"outline"}
                  className="cursor-pointer"
                  tabIndex={-1}
                >
                  Log In
                </Button>
              </Link>
            ) : (
              <div className="flex flex-col items-center my-6 gap-2">
                <div className="flex flex-col gap-2 items-center">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      width={200}
                      alt="User Avatar"
                    />
                    <AvatarFallback>
                      {user?.user_metadata?.display_name}
                    </AvatarFallback>
                  </Avatar>
                  <p>{user?.user_metadata?.display_name}</p>
                </div>
                <Button
                  variant="outline"
                  className="cursor-pointer flex w-max justify-center items-center gap-2"
                  onClick={() => handleLogout()}
                  disabled={isLoggingOut}
                >
                  <LogOut className="h-4 w-4" />
                  {isLoggingOut ? "Logging out..." : "Logout"}
                  Logout
                </Button>
              </div>
            )}
            <div>
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "block relative px-3 py-2.5 rounded-md text-base font-medium transition-all duration-200",
                      isActive
                        ? "bg-violet-50 text-violet-700"
                        : "text-gray-600"
                    )}
                  >
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
