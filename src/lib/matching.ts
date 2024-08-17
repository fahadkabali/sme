import { prisma } from './db'

export async function findMatches(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    throw new Error('User not found')
  }

  const potentialMatches = await prisma.user.findMany({
    where: {
      AND: [
        { id: { not: userId } },
        { industry: user.industry },
        { companyType: { not: user.companyType } },
      ],
    },
  })

  return potentialMatches.map(match => ({
    id: match.id,
    name: match.name,
    companyName: match.companyName,
    companyType: match.companyType,
    industry: match.industry,
    location: match.location,
  }))
}