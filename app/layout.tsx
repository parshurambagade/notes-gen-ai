import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainHeader from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/authContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
}); 

export const metadata: Metadata = {
  title: "NotesGen AI - AI Powered YouTube Notes",
  description:
    "Generate AI-powered notes from YouTube lectures with NotesGen AI.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <MainHeader />
          {children}
          <Footer />
          <Toaster
            position="top-right"
            richColors
            closeButton
            expand={true}
            toastOptions={{
              style: {
                marginTop: "60px", // Add space from top if you have a navbar
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
