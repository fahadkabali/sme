"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import MatchList from '../matches/MatchList'
import InteractionsDashboard from './InteractionsDashboard'
import ProfileForm from '../profile/ProfileForm'
import LogoutButton from '../auth/LogoutButton'

export default function Dashboard() {
  const [user, setUser] = useState<{
    name: string
    email: string
    companyName: string
    companyType: string
    industry: string
    location: string
    description: string
    website: string
  } | null>(null)

  useEffect(() => {
    fetchUserProfile()
  }, [])

  async function fetchUserProfile() {
    const response = await fetch('/api/profile')
    if (response.ok) {
      const data = await response.json()
      setUser(data)
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="space-x-4">
          <Link href="/profile" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Edit Profile
          </Link>
          <Link href="/logout" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Logout
          </Link>
          <LogoutButton/>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Your Profile</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Company Name:</strong> {user.companyName}</p>
            <p><strong>Company Type:</strong> {user.companyType}</p>
            <p><strong>Industry:</strong> {user.industry}</p>
            <p><strong>Location:</strong> {user.location}</p>
            <p><strong>Description:</strong> {user.description}</p>
            {user.website && (
              <p>
                <strong>Website:</strong>{' '}
                <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
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