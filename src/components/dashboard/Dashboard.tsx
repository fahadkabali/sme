"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, Home, Users, Bell, Settings, LogOut, ChevronRight } from 'lucide-react';

// Components imports
import MatchList from '../matches/MatchList';
import InteractionsDashboard from './InteractionsDashboard';
import ProfileForm from '../profile/ProfileForm';
import LogoutButton from '../auth/LogoutButton';
import Header from './Header';

// Types
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

// Sidebar Navigation Items
const navigationItems = [
  { name: 'Dashboard', icon: Home, href: '/dashboard' },
  { name: 'Matches', icon: Users, href: '/matches' },
  { name: 'Notifications', icon: Bell, href: '/notifications' },
  { name: 'Settings', icon: Settings, href: '/settings' },
];

// Profile Card Component
const ProfileCard = ({ user }: { user: UserProfile }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <div className="flex items-center space-x-4 mb-4">
      <div className="bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center">
        <span className="text-white text-xl font-bold">
          {user.name.charAt(0)}
        </span>
      </div>
      <div>
        <h3 className="text-lg font-semibold">{user.name}</h3>
        <p className="text-sm text-gray-600">{user.email}</p>
      </div>
    </div>
    <div className="space-y-2">
      <InfoRow label="Company" value={user.companyName} />
      <InfoRow label="Industry" value={user.industry} />
      <InfoRow label="Location" value={user.location} />
    </div>
    {user.website && (
      <a
        href={user.website}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 text-blue-500 hover:underline inline-flex items-center"
      >
        Visit Website
        <ChevronRight className="w-4 h-4 ml-1" />
      </a>
    )}
  </div>
);

// Info Row Component
const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-600 text-sm">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
  </div>
);

// Error Message Component
const ErrorMessage = ({ message, retry }: { message: string; retry: () => void }) => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
      <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
      <p className="text-gray-700 mb-4">{message}</p>
      <button
        onClick={retry}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Retry
      </button>
    </div>
  </div>
);

// Main Dashboard Component
export default function Dashboard() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  async function fetchUserProfile() {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/profile');
      
      if (response.status === 401) {
        router.push('/login');
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch profile: ${response.statusText}`);
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError(error instanceof Error ? error.message : 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} retry={fetchUserProfile} />;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} onLogout={() => { /* your logout logic */ }} />
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 bg-white shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out w-64 z-30`}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg mb-1"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t">
            <LogoutButton className="flex items-center space-x-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg w-full">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </LogoutButton>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`${
          isSidebarOpen ? 'lg:ml-64' : ''
        } transition-margin duration-300 ease-in-out`}
      >
        {/* Mobile Header */}
        <header className="bg-white shadow-sm lg:hidden">
          <div className="p-4 flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
            <div className="w-8" /> {/* Spacer for alignment */}
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-1">
              <ProfileCard user={user} />
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Recent Interactions</h2>
                <InteractionsDashboard />
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Your Matches</h2>
                <MatchList />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}