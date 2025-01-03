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
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside 
        className={`fixed left-0 h-full transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <Sidebar isOpen={isSidebarOpen} />
      </aside>

      {/* Main Content Wrapper */}
      <div 
        className={`flex flex-col flex-1 min-h-screen transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        {/* Header */}
        <Header
          user={userProfile}
          onLogout={handleLogout}
          sidebarWidth={isSidebarOpen ? SIDEBAR_OPEN_WIDTH : SIDEBAR_CLOSED_WIDTH}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          className="sticky top-0 z-20 w-full"
        />

        {/* Main Content */}
        <main className="flex-grow px-4 py-6 md:px-6 lg:px-8">
          {children}
        </main>

        {/* Footer */}
        <Footer
          sidebarWidth={isSidebarOpen ? SIDEBAR_OPEN_WIDTH : SIDEBAR_CLOSED_WIDTH}
          isSidebarOpen={isSidebarOpen}
          className="w-full"
        />
      </div>
    </div>
  );
}