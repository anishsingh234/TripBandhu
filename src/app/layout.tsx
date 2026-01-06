import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
const outfit=Outfit({subsets:['latin']})


export const metadata: Metadata = {
  title: "Trip Bandhu - Your Personal Travel Buddy",
  description: "Plan your perfect trip in seconds with AI-powered itineraries, flights, and hotels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={outfit.className}
      >
       <ConvexClientProvider>
        {children}
       </ConvexClientProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
