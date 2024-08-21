'use client'

import { useState, useEffect } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

interface MatchAnalytics {
  month: string
  newMatches: number
  interactedMatches: number
}

export default function AnalyticsDashboard() {
  const [matchAnalytics, setMatchAnalytics] = useState<MatchAnalytics[]>([])

  useEffect(() => {
    fetchMatchAnalytics()
  }, [])

  async function fetchMatchAnalytics() {
    const response = await fetch('/api/analytics')
    if (response.ok) {
      const data = await response.json()
      setMatchAnalytics(data)
    }
  }

  const barChartData = {
    labels: matchAnalytics.map((item) => item.month),
    datasets: [
      {
        label: 'New Matches',
        data: matchAnalytics.map((item) => item.newMatches),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Interacted Matches',
        data: matchAnalytics.map((item) => item.interactedMatches),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  }

  const lineChartData = {
    labels: matchAnalytics.map((item) => item.month),
    datasets: [
      {
        label: 'New Matches',
        data: matchAnalytics.map((item) => item.newMatches),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
      {
        label: 'Interacted Matches',
        data: matchAnalytics.map((item) => item.interactedMatches),
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.1,
      },
    ],
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Analytics Dashboard</h2>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-2">New Matches vs. Interacted Matches</h3>
          <Bar data={barChartData} />
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">New Matches vs. Interacted Matches (Trend)</h3>
          <Line data={lineChartData} />
        </div>
      </div>
    </div>
  )
}