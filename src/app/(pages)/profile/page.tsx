import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import ProfileForm from '@/components/profile/ProfileForm'

export default async function ProfilePage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email as string },
  })

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <ProfileForm user={{
          id: user.id,
          name: user.name ?? '',
          email: user.email,
          companyName: user.companyName ?? '',
          companyType: user.companyType ?? '',
          industry: user.industry ?? '',
          location: user.location ?? '',
          description: user.description ?? '',
          website: user.website ?? '',
      }} />
    </div>
  )
}