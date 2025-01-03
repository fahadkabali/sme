"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, ChevronDown, User, Settings, HelpCircle, Menu } from 'lucide-react';
import LogoutButton from '../auth/LogoutButton';
import { cn } from "@/lib/utils";

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

interface HeaderProps {
  user: UserProfile;
  onLogout: () => void;
  sidebarWidth?: number;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
  className?: string;
}

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  isRead: boolean;
  timestamp?: string;
}

const Header = ({ 
  user, 
  onLogout, 
  sidebarWidth = 256, // Default sidebar width
  isSidebarOpen = true,
  onToggleSidebar,
  className 
}: HeaderProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const [notifications] = useState<NotificationItem[]>([
    {
      id: '1',
      title: 'New Match Found',
      description: 'A new company matches your profile',
      isRead: false,
      timestamp: '5m ago'
    },
    {
      id: '2',
      title: 'Profile Update',
      description: 'Your profile was successfully updated',
      isRead: true,
      timestamp: '1h ago'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsMobileSearchOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsProfileDropdownOpen(false);
        setIsNotificationsOpen(false);
        setIsProfileOpen(false);
        setIsMobileSearchOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Calculate header position based on sidebar
  const headerStyle = {
    left: isSidebarOpen ? `${sidebarWidth}px` : '0',
    width: isSidebarOpen ? `calc(100% - ${sidebarWidth}px)` : '100%',
    transition: 'left 0.3s ease-in-out, width 0.3s ease-in-out',
  };

  return (
    <>
      <header 
        className={cn(
          "bg-white border-b border-gray-200 fixed top-0 h-16 z-30 shadow-sm",
          className
        )}
        style={headerStyle}
      >
        <div className="h-full px-4 sm:px-6">
          <div className="flex items-center justify-between h-full">
            {/* Left section with hamburger and search */}
            <div className="flex items-center flex-1">
              {/* Hamburger menu for sidebar toggle */}
              <button
                onClick={onToggleSidebar}
                className="p-2 mr-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:hidden"
                aria-label="Toggle sidebar"
              >
                <Menu className="h-5 w-5" />
              </button>

              {/* Search bar - hidden on mobile unless activated */}
              <div 
                ref={searchRef}
                className={cn(
                  "max-w-xl w-full",
                  isMobileSearchOpen ? "absolute left-0 top-0 p-4 bg-white h-full z-50 md:relative md:p-0" : "hidden md:block"
                )}
              >
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${isSearchFocused ? 'text-blue-500' : 'text-gray-400'}`}>
                    <Search className="h-5 w-5" />
                  </div>
                  <input
                    type="search"
                    placeholder="Search matches..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                </div>
              </div>

              {/* Mobile search trigger */}
              <button
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-md md:hidden"
                onClick={() => setIsMobileSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </button>
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Notifications */}
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={`${unreadCount} unread notifications`}
                >
                  <Bell className={unreadCount > 0 ? 'text-blue-500' : 'text-gray-500'} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications dropdown */}
                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 max-h-[calc(100vh-6rem)] overflow-y-auto">
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                        {unreadCount > 0 && (
                          <button className="text-sm text-blue-500 hover:text-blue-600">
                            Mark all as read
                          </button>
                        )}
                      </div>
                      <div className="space-y-2">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={cn(
                              "p-3 rounded-lg transition-colors duration-200 hover:bg-gray-50 cursor-pointer",
                              !notification.isRead && "bg-blue-50"
                            )}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1 mr-2">
                                <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                                <p className="text-sm text-gray-500 mt-1">{notification.description}</p>
                              </div>
                              {notification.timestamp && (
                                <span className="text-xs text-gray-400 whitespace-nowrap">
                                  {notification.timestamp}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Menu */}
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-3 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <div className="relative">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-8 h-8 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
                  </div>
                  <div className="hidden sm:flex items-center space-x-1">
                    <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate">
                      {user.name}
                    </span>
                    <ChevronDown className={cn(
                      "h-4 w-4 text-gray-500 transition-transform duration-200",
                      isProfileDropdownOpen && "rotate-180"
                    )} />
                  </div>
                </button>

                {/* Profile dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="p-4 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setIsProfileOpen(true);
                          setIsProfileDropdownOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </button>
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </button>
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <HelpCircle className="mr-2 h-4 w-4" />
                        <span>Help Center</span>
                      </button>
                      <div className="border-t border-gray-100 mt-1">
                        <LogoutButton />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Modal */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setIsProfileOpen(false)}
            />

            {/* Modal */}
            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 w-full text-center sm:mt-0 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                      Profile Details
                    </h3>
                    
                    <div className="mb-6 flex items-center space-x-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-md">
                        <span className="text-2xl font-bold text-white">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-lg bg-gray-50 p-4 transition-colors duration-200 hover:bg-gray-100">
                        <h4 className="mb-2 text-sm font-medium text-gray-500">Company Information</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Company</span>
                            <span className="text-sm font-medium">{user.companyName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Type</span>
                            <span className="text-sm font-medium">{user.companyType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Industry</span>
                            <span className="text-sm font-medium">{user.industry}</span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg bg-gray-50 p-4 transition-colors duration-200 hover:bg-gray-100">
                        <h4 className="mb-2 text-sm font-medium text-gray-500">Contact Details</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Location</span>
                            <span className="text-sm font-medium">{user.location}</span>
                          </div>
                          {user.website && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Website</span>
                              <a 
                                href={user.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-500 hover:text-blue-600 hover:underline"
                              >
                                {user.website}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>

                      {user.description && (
                        <div className="rounded-lg bg-gray-50 p-4 transition-colors duration-200 hover:bg-gray-100">
                          <h4 className="mb-2 text-sm font-medium text-gray-500">About</h4>
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">{user.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => setIsProfileOpen(false)}
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;