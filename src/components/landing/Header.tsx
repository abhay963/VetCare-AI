"use client";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import GoogleTranslateButton from "../GoogleTranslateButton";

function Header() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-3 border-b border-border/50 bg-background/80 backdrop-blur-md">
      
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* 🔹 LEFT LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/pawprint.png"
            alt="Logo"
            width={32}
            height={32}
            className="w-10 transition-transform group-hover:scale-110"
          />
          <span 
          
          className="font-semibold text-lg tracking-tight">
            VetCare AI
          </span>
        </Link>

        {/* 🔹 CENTER NAV LINKS */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#how-it-works" className="nav-link">
            How it Works
          </Link>

          <Link href="/#pricing" className="nav-link">
            Pricing
          </Link>

<SignedIn>
  <Link href="/hospital" className="nav-link">
    Nearby Hospital
  </Link>
</SignedIn>

<SignedOut>
  <SignInButton mode="modal">
    <button className="nav-link cursor-pointer">
      Nearby Hospital
    </button>
  </SignInButton>
</SignedOut>


<SignedIn>
  <Link href="/remedies" className="nav-link">
    Home Remedies
  </Link>
</SignedIn>

<SignedOut>
  <SignInButton mode="modal">
    <button className="nav-link cursor-pointer">
      Home Remedies
    </button>
  </SignInButton>
</SignedOut>

          <Link href="about" className="nav-link">
            About
          </Link>
        </div>

        {/* 🔹 RIGHT SECTION */}
        <div className="flex items-center gap-4">

          {/* 🌐 LANGUAGE */}
          <GoogleTranslateButton />

          {/* AUTH */}
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </SignInButton>

            <SignUpButton mode="modal">
              <Button size="sm">Sign Up</Button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

        </div>
      </div>
    </nav>
  );
}

export default Header;