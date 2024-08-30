"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Match {
  id: string
  name: string
  companyName: string
  companyType: string
  industry: string
  location: string
}

interface MatchesResponse {
  matches: Match[]
  totalMatches: number
  currentPage: number
  totalPages: number
}

export default function MatchList() {
  const [matchesData, setMatchesData] = useState<MatchesResponse | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [industry, setIndustry] = useState('')
  const [companyType, setCompanyType] = useState('')
  const [location, setLocation] = useState('')

  useEffect(() => {
    fetchMatches(currentPage)
  }, [currentPage, searchTerm, industry, companyType, location])

  async function fetchMatches(page: number) {
    const params = new URLSearchParams({
      page: page.toString(),
      ...(searchTerm && { search: searchTerm }),
      ...(industry && { industry }),
      ...(companyType && { companyType }),
      ...(location && { location }),
    })
    const response = await fetch(`/api/matches?${params}`)
    if (response.ok) {
      const data = await response.json()
      setMatchesData(data)
    }
  }

  async function handleInteraction(matchId: string, status: string) {
    const response = await fetch('/api/matches/interact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matchId, status }),
    })

    if (response.ok) {
      console.log(`Interaction with match ${matchId} updated to ${status}`)
    }
  }

  if (!matchesData) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Matches</h2>
      <div className="mb-4 space-y-2">
        <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search matches..."
            className="w-full p-2 border rounded"
        />
        <div className="flex space-x-2">
        <input
            type="text"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder="Industry..."
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            value={companyType}
            onChange={(e) => setCompanyType(e.target.value)}
            placeholder="Company Type..."
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location..."
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      {matchesData.matches.length === 0 ? (
        <p>No matches found.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {matchesData.matches.map(match => (
              <li key={match.id} className="border p-4 rounded">
                <h3 className="font-bold">{match.companyName}</h3>
                <p><strong>Type:</strong>Type: {match.companyType}</p>
                <p><strong>Industry:</strong>Industry: {match.industry}</p>
                <p><strong>Location</strong>Location: {match.location}</p>
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => handleInteraction(match.id, 'interested')}
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Interested
                  </button>
                  <button
                    onClick={() => handleInteraction(match.id, 'not interested')}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Not Interested
                  </button>
                  <Link href={`/matches/${match.id}`} className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                    View Details
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Previous
            </button>
            <span>Page {currentPage} of {matchesData.totalPages}</span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, matchesData.totalPages))}
              disabled={currentPage === matchesData.totalPages}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}