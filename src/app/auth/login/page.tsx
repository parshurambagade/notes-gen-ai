"use client";

import { useEffect, Suspense } from "react";
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
import { ArrowLeft } from "lucide-react";

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
    <main className="min-h-screen pt-24 md:pt-28 pb-20 flex items-start justify-center px-4 md:px-8">
      <div className="w-full max-w-sm">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </Button>
        <Card className="w-full">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Link href={"/auth/register"} tabIndex={0}>
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
      </div>
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
