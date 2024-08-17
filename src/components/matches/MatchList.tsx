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

  useEffect(() => {
    fetchMatches(currentPage)
  }, [currentPage])

  async function fetchMatches(page: number) {
    const response = await fetch(`/api/matches?page=${page}`)
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
      // Optionally, you can update the UI to reflect the interaction
      console.log(`Interaction with match ${matchId} updated to ${status}`)
    }
  }

  if (!matchesData) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Matches</h2>
      {matchesData.matches.length === 0 ? (
        <p>No matches found.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {matchesData.matches.map(match => (
              <li key={match.id} className="border p-4 rounded">
                <h3 className="font-bold">{match.companyName}</h3>
                <p>Type: {match.companyType}</p>
                <p>Industry: {match.industry}</p>
                <p>Location: {match.location}</p>
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