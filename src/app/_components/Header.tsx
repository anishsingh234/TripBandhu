import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";

const menuOptions = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Pricing",
    path: "/pricing",
  },
  {
    name: "Contact us",
    path: "/contact-us",
  },
];

export default function Header() {
  const { user } = useUser();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link href={"/"} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image src={"/logo.svg"} alt="Trip Bandhu logo" width={36} height={36} className="w-9 h-9" />
            <h1 className="font-bold text-xl md:text-2xl bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Trip Bandhu
            </h1>
          </Link>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {menuOptions.map((menu, index) => (
              <Link 
                key={index} 
                href={menu.path}
                className="text-base font-medium text-gray-700 hover:text-purple-600 transition-colors relative group"
              >
                {menu.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div>
            {!user ? (
              <SignInButton mode="modal">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 transition-all">
                  Get Started
                </Button>
              </SignInButton>
            ) : (
              <Link href={"/create-new-trip"}>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 transition-all">
                  Create new trip
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}