import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import "./globals.css";
import { SessionProvider } from 'next-auth/react'
import Link from "next/link";
import { NextAuthProvider } from "./providers/NextAuthProvider";



export const metadata: Metadata = {
  title: "SME -APP ",
  description: "Match making",
};
 
 
const inter = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <NextAuthProvider>
          {children}
      </NextAuthProvider>
      </body>
    </html>
  )
}