"use client"
import React, { useState } from 'react';
import Sidebar from './sidebar/Sidebar';
import Header from './Header';
import { useSession } from "next-auth/react"; // Assuming you're using NextAuth
import { signOut } from "next-auth/react";

// Types for user profile
interface UserProfile {
  name: string;
  email: string;
  companyName: string;
  companyType: string;
  industry: string;
  location: string;
  description: string;
  website: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  // State for sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Get session data (if using NextAuth)
  const { data: session } = useSession();

  // Create user profile from session data
  const userProfile: UserProfile = {
    name: session?.user?.name || 'User Name',
    email: session?.user?.email || 'user@example.com',
    companyName: session?.user?.companyName || 'Company Name',
    companyType: session?.user?.companyType || 'Company Type',
    industry: session?.user?.industry || 'Industry',
    location: session?.user?.location || 'Location',
    description: session?.user?.description || '',
    website: session?.user?.website || '',
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: '/auth/signin' });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar 
        isOpen={isSidebarOpen}
        className={`transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      />
      
      <div className="flex flex-1 flex-col">
        <Header
          user={userProfile}
          onLogout={handleLogout}
          sidebarWidth={isSidebarOpen ? 256 : 80}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        
        <main className={`flex-1 p-6 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}>
          {children}
        </main>
      </div>
    </div>
  );
}