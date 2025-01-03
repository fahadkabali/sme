"use client"
import React, { useState } from 'react';
import Sidebar from './sidebar/Sidebar';
import Header from './Header';
import Footer from './Footer';
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { data: session } = useSession();

  // Sidebar width constants
  const SIDEBAR_OPEN_WIDTH = 256;
  const SIDEBAR_CLOSED_WIDTH = 80;

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

  const handleLogout = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: '/auth/signin' });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen}
        className={`fixed left-0 h-full z-30 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? `w-[${SIDEBAR_OPEN_WIDTH}px]` : `w-[${SIDEBAR_CLOSED_WIDTH}px]`
        }`}
      />
      
      {/* Main Content Area */}
      <div className="flex flex-col min-h-screen w-full">
        {/* Header */}
        <Header
          user={userProfile}
          onLogout={handleLogout}
          sidebarWidth={isSidebarOpen ? SIDEBAR_OPEN_WIDTH : SIDEBAR_CLOSED_WIDTH}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-0 right-0 z-20"
        />
        
        {/* Main Content */}
        <main 
          className={`flex-grow p-6 mt-16 transition-all duration-300 ease-in-out ${
            isSidebarOpen 
              ? `ml-[${SIDEBAR_OPEN_WIDTH}px]` 
              : `ml-[${SIDEBAR_CLOSED_WIDTH}px]`
          }`}
        >
          <div className="container mx-auto max-w-7xl">
            {children}
          </div>
        </main>

        {/* Footer */}
        <Footer 
          sidebarWidth={isSidebarOpen ? SIDEBAR_OPEN_WIDTH : SIDEBAR_CLOSED_WIDTH}
          isSidebarOpen={isSidebarOpen}
          className={`transition-all duration-300 ease-in-out ${
            isSidebarOpen 
              ? `ml-[${SIDEBAR_OPEN_WIDTH}px]` 
              : `ml-[${SIDEBAR_CLOSED_WIDTH}px]`
          }`}
        />
      </div>
    </div>
  );
}