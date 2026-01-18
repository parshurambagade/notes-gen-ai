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
import { useRegister } from "@/hooks/useRegister";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your details below to create an account
          </CardDescription>
          <CardAction>
            <Button
              variant="link"
              onClick={() => router.push("/auth/login")}
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
      </div>
    </main>
  );
};

export default Register;
