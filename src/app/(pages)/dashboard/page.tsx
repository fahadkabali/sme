import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import LogoutButton from '@/components/auth/LogoutButton'
import MatchList from '@/components/matches/MatchList'
import InteractionsDashboard from '@/components/dashboard/InteractionsDashboard'
import Dashboard from '@/components/dashboard/Dashboard'
// import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard'

export default async function DashboardPage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/login')
  }

  return (
    // <div className="min-h-screen bg-gray-100 p-8">
    //   <div className="flex justify-between items-center mb-8">
    //     <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
    //     <div className="space-x-4">
    //       <Link href="/profile" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
    //         Edit Profile
    //       </Link>
    //       <LogoutButton />
    //     </div>
    //   </div>
    //   <p className="mb-8">You are logged in as: {session.user?.email}</p>
    //   <MatchList />
    //   <div className="mt-8">
    //     <InteractionsDashboard />
    //   </div>
    //   <div className="mt-8">
    //     <MatchList />
    //   </div>
    // </div>

    <div className="min-h-screen bg-gray-100 p-8">
      <Dashboard />
      <div className="mt-8">
        {/* <AnalyticsDashboard /> */}
      </div>
    </div>
  )
}