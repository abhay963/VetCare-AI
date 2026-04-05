import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import UserSync from "@/components/UserSync";
import TanStackProvider from "@/components/providers/TanStackProvider";
import { Toaster } from "sonner";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VetCare AI | Smart Veterinary Assistance Platform",
  description:
    "VetCare AI is an AI-powered veterinary platform that analyzes animal symptoms, suggests treatments, and connects users with nearby veterinarians.",
  authors: [{ name: "Abhay Kumar Yadav" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TanStackProvider>
      <html lang="en" className="dark">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

          {/* 🌐 GOOGLE TRANSLATE */}
        {/* 🌐 GOOGLE TRANSLATE (LOAD ONCE ONLY) */}
<Script
  src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
  strategy="afterInteractive"
/>

<Script id="google-translate-init" strategy="afterInteractive">
  {`
    if (!window.googleTranslateInitialized) {
      window.googleTranslateInitialized = true;

      function googleTranslateElementInit() {
        new google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,hi,pa,bn,ta', // ✅ reduced clean set
            autoDisplay: true
          },
          'google_translate_element'
        );
      }

      window.googleTranslateElementInit = googleTranslateElementInit;
    }
  `}
</Script>

          <ClerkProvider
            appearance={{
              variables: {
                colorPrimary: "#2e7d32",
                colorBackground: "#f4fbf6",
                colorText: "#1b3a2a",
                colorTextSecondary: "#4e6b57",
                colorInputBackground: "#eef7f0",
                colorDanger: "#c62828",
                borderRadius: "0.6rem"
              },
            }}
          >
            <UserSync />
            {children}
            <Toaster />
          </ClerkProvider>

        </body>
      </html>
    </TanStackProvider>
  );
}