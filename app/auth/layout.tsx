import { useAuth } from "@/contexts/authContext";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  // If the user is already logged in, redirect to the notes page
  if (session) redirect("/notes/all");

  return <>{children}</>;
}
