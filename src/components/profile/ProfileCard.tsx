
"use client"
import React from 'react';
import Link from 'next/link';
import { Menu, X, Home, Users, Bell, Settings, LogOut, ChevronRight } from 'lucide-react';

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

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-600 text-sm">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);
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
