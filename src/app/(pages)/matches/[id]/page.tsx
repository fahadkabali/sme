import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import MessageInterface from '@/components/messages/MessageInterface'


export default async function MatchDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession()

  if (!session) {
    redirect('/login')
  }

  const match = await prisma.user.findUnique({
    where: { id: params.id },
  })

  if (!match) {
    return <div>Match not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Link href="/dashboard" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Dashboard
      </Link>
      <h1 className="text-2xl font-bold mb-4">{match.companyName}</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p><strong>Company Type:</strong> {match.companyType}</p>
        <p><strong>Industry:</strong> {match.industry}</p>
        <p><strong>Location:</strong> {match.location}</p>
        <p><strong>Description:</strong> {match.description}</p>
        {match.website && (
          <p>
            <strong>Website:</strong>{' '}
            <a href={match.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {match.website}
            </a>
          </p>
        )}
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Messages</h2>
        <MessageInterface matchId={params.id} />
      </div>
    </div>
  )
}