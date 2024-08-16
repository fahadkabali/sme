import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import "./globals.css";
import { SessionProvider } from 'next-auth/react'
import Link from "next/link";
import { NextAuthProvider } from "./providers/NextAuthProvider";



// import {
//   ClerkProvider,
//   SignInButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from "@clerk/nextjs";


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

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//   <ClerkProvider>
//     <html lang='en'>
//       <body className={inter.className}>
//         <nav className='flex justify-between items-center h-[10vh] px-8 border-b-[1px]'>
//           <Link href='/' className='text-xl font-extrabold text-blue-700'>
//           Invoicer
//           </Link>
//           <div className='flex items-center gap-5'>
//                                     {/*-- if user is signed out --*/}
//             <SignedOut>
//             <SignInButton mode='modal' />
//             </SignedOut>
//                                     {/*-- if user is signed in --*/}
//             <SignedIn>
//             <Link href='/dashboard' className=''>
//               Dashboard
//             </Link>
//             <UserButton showName />
//             </SignedIn>
//           </div>
//         </nav>
//           {children}
//       </body>
//     </html>
//   </ClerkProvider>
// );
// }