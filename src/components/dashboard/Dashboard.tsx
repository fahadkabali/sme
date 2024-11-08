'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import MatchList from '../matches/MatchList'
import {useRouter}
import InteractionsDashboard from './InteractionsDashboard'
import ProfileForm from '../profile/ProfileForm'
import LogoutButton from '../auth/LogoutButton'

interface UserProfile {
  name: string
  email: string
  companyName: string
  companyType: string
  industry: string
  location: string
  description: string
  website: string
}

export default function Dashboard() {
  const [user, setUser] = useState<UserProfile | null>(null)

  useEffect(() => {
    fetchUserProfile()
  }, [])

  async function fetchUserProfile() {
    try {
      const response = await fetch('/api/profile')
      if (!response.ok) {
        throw new Error('Failed to fetch profile')
      }
      const data = await response.json()
      setUser(data)
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="space-x-4">
          <Link 
            href="/profile" 
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Edit Profile
          </Link>
          <LogoutButton />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Your Profile</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="mb-2"><strong>Name:</strong> {user.name}</p>
            <p className="mb-2"><strong>Email:</strong> {user.email}</p>
            <p className="mb-2"><strong>Company Name:</strong> {user.companyName}</p>
            <p className="mb-2"><strong>Company Type:</strong> {user.companyType}</p>
            <p className="mb-2"><strong>Industry:</strong> {user.industry}</p>
            <p className="mb-2"><strong>Location:</strong> {user.location}</p>
            <p className="mb-2"><strong>Description:</strong> {user.description}</p>
            {user.website && (
              <p>
                <strong>Website:</strong>{' '}
                <a 
                  href={user.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-500 hover:underline transition-colors"
                >
                  {user.website}
                </a>
              </p>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Match Interactions</h2>
          <InteractionsDashboard />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Your Matches</h2>
        <MatchList />
      </div>
    </div>
  )
}