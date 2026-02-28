import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'

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
    "VetCare AI is an AI-powered veterinary platform that analyzes animal symptoms, suggests treatments, and connects users with nearby veterinarians for instant consultation.",
  keywords: [
    "VetCare AI",
    "AI veterinary platform",
    "animal healthcare",
    "pet disease detection",
    "livestock health",
    "online vet consultation",
    "AI image analysis for animals",
  ],
  authors: [{ name: "Abhay Kumar Yadav" }],
  creator: "Abhay Kumar Yadav",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider
       appearance={{
  variables: {
    colorPrimary: "#2e7d32",          // forest green
    colorBackground: "#f4fbf6",       // soft mint background
    colorText: "#1b3a2a",             // deep green text
    colorTextSecondary: "#4e6b57",    // muted green
    colorInputBackground: "#eef7f0",  // soft input bg
    colorDanger: "#c62828",           // error red
    borderRadius: "0.6rem"
  },
}}>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
