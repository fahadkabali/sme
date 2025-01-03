import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, ChevronDown, User, Settings, HelpCircle, LogOut } from 'lucide-react';
import LogoutButton from '../auth/LogoutButton';


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
}

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  isRead: boolean;
  timestamp?: string;
}

const Header = ({ user, onLogout }: HeaderProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Animation classes
  const dropdownAnimation = "transition-all duration-200 ease-in-out transform origin-top";
  const modalAnimation = "transition-all duration-300 ease-in-out";
  const buttonAnimation = "transition-transform duration-200 ease-in-out hover:scale-105";

  return (
    <>
      <header className="bg-white border-b border-gray-200 fixed w-full z-20 top-0 shadow-sm ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left section */}
            <div className="flex-1 flex items-center">
              <div className="max-w-xs w-full lg:max-w-lg">
                <label htmlFor="search" className="sr-only">Search</label>
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 ${isSearchFocused ? 'text-blue-500' : 'text-gray-400'}`}>
                    <Search className="h-5 w-5" />
                  </div>
                  <input
                    id="search"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                    placeholder="Search matches..."
                    type="search"
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                </div>
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-4">
              {/* Notifications Dropdown */}
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className={`relative p-2 rounded-full hover:bg-gray-100 focus:outline-none ${buttonAnimation}`}
                >
                  <Bell className={`h-6 w-6 ${unreadCount > 0 ? 'text-blue-500' : 'text-gray-500'}`} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {isNotificationsOpen && (
                  <div className={`absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 ${dropdownAnimation}`}>
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Notifications</h3>
                      <div className="space-y-2">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-3 rounded-lg transition-colors duration-200 hover:bg-gray-50 ${
                              notification.isRead ? 'bg-white' : 'bg-blue-50'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                                <p className="text-sm text-gray-500 mt-1">{notification.description}</p>
                              </div>
                              {notification.timestamp && (
                                <span className="text-xs text-gray-400">{notification.timestamp}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className={`flex items-center space-x-3 p-2 rounded-full hover:bg-gray-100 ${buttonAnimation}`}
                >
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-8 h-8 flex items-center justify-center shadow-sm">
                    <span className="text-white text-sm font-medium">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div className="hidden md:flex items-center space-x-1">
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                    <ChevronDown className={`h-4 w-4 text-gray-500 transform transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {isProfileDropdownOpen && (
                  <div className={`absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 ${dropdownAnimation}`}>
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setIsProfileOpen(true);
                          setIsProfileDropdownOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </button>
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </button>
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                        <HelpCircle className="mr-2 h-4 w-4" />
                        <span>Help Center</span>
                      </button>
                      <LogoutButton>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </LogoutButton>   
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
        <div className={`fixed inset-0 z-50 overflow-y-auto ${modalAnimation}`}>
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={() => setIsProfileOpen(false)}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${modalAnimation}`}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Profile Details
                    </h3>
                    
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-16 h-16 flex items-center justify-center shadow-md">
                        <span className="text-white text-2xl font-bold">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Company Information</h4>
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

                      <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Contact Details</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Location</span>
                            <span className="text-sm font-medium">{user.location}</span>
                          </div>
                          {user.website && (
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Website</span>
                              <a 
                                href={user.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-500 hover:underline"
                              >
                                {user.website}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>

                      {user.description && (
                        <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                          <h4 className="text-sm font-medium text-gray-500 mb-2">About</h4>
                          <p className="text-sm text-gray-700">{user.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
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