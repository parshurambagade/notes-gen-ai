"use client";

import React, { useEffect, Suspense } from "react";
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
import Link from "next/link";
import { useLogin } from "@/hooks/useLogin";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

function LoginForm() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    isLoading,
    error,
  } = useLogin();

  // Show toast when there's a message from redirect
  useEffect(() => {
    if (message) {
      toast.info(message, {
        id: "login-redirect",
        duration: 4000,
        description: "Please enter your credentials to continue",
      });
    }
  }, [message]);

  return (
    <main className="py-20 md:py-40 min-h-[95vh] flex items-center md:items-start justify-center px-2 md:px-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Link href={"/register"} tabIndex={0}>
              <Button variant="link" className="cursor-pointer">
                Sign Up
              </Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  autoFocus
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    aria-disabled
                    tabIndex={-1}
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  placeholder="******"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login to your account"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

const Login = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
};

export default Login;
