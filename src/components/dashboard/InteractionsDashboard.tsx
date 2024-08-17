"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Interaction {
  id: string
  matchId: string
  status: string
  match: {
    companyName: string
    industry: string
  }
}

export default function InteractionsDashboard() {
  const [interactions, setInteractions] = useState<Interaction[]>([])

  useEffect(() => {
    fetchInteractions()
  }, [])

  async function fetchInteractions() {
    const response = await fetch('/api/interactions')
    if (response.ok) {
      const data = await response.json()
      setInteractions(data)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Match Interactions</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Company</th>
            <th className="border p-2">Industry</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {interactions.map((interaction) => (
            <tr key={interaction.id}>
              <td className="border p-2">{interaction.match.companyName}</td>
              <td className="border p-2">{interaction.match.industry}</td>
              <td className="border p-2">{interaction.status}</td>
              <td className="border p-2">
                <Link href={`/matches/${interaction.matchId}`} className="text-blue-500 hover:underline">
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}