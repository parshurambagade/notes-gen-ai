"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import React from "react";
import { useRegister } from "@/hooks/useRegister";

const Register = () => {
  const router = useRouter();
  const {
    name,
    email,
    password,
    isLoading,
    error,
    handleRegister,
    handleInputChange,
  } = useRegister();

  return (
    <main className="py-20 md:py-40 min-h-[95vh] flex items-center md:items-start justify-center px-2 md:px-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your details below to create an account
          </CardDescription>
          <CardAction>
            <Button
              variant="link"
              onClick={() => router.push("/login")}
              className="cursor-pointer"
              disabled={isLoading}
            >
              Login
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <div className="flex flex-col gap-6">
              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                  disabled={isLoading}
                  autoFocus
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleInputChange}
                  placeholder="m@example.com"
                  required
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="******"
                  required
                  value={password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default Register;
