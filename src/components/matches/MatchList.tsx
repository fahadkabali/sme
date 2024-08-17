"use client"

import { useEffect, useState } from 'react'

interface Match {
  id: string
  name: string
  companyName: string
  companyType: string
  industry: string
  location: string
}

export default function MatchList() {
  const [matches, setMatches] = useState<Match[]>([])

  useEffect(() => {
    async function fetchMatches() {
      const response = await fetch('/api/matches')
      if (response.ok) {
        const data = await response.json()
        setMatches(data)
      }
    }

    fetchMatches()
  }, [])

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Matches</h2>
      {matches.length === 0 ? (
        <p>No matches found.</p>
      ) : (
        <ul className="space-y-4">
          {matches.map(match => (
            <li key={match.id} className="border p-4 rounded">
              <h3 className="font-bold">{match.companyName}</h3>
              <p>Type: {match.companyType}</p>
              <p>Industry: {match.industry}</p>
              <p>Location: {match.location}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}