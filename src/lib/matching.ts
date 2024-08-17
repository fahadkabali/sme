import { prisma } from './db'

interface MatchCriteria {
  industry: string
  companyType: string
  location: string
}

export async function findMatches(userId: string, page = 1, limit = 10) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    throw new Error('User not found')
  }

  const matchCriteria: MatchCriteria = {
    industry: user.industry || '',
    companyType: user.companyType === 'SME' ? 'Large Enterprise' : 'SME',
    location: user.location || '',
  }

  const potentialMatches = await prisma.user.findMany({
    where: {
      AND: [
        { id: { not: userId } },
        { industry: matchCriteria.industry },
        { companyType: matchCriteria.companyType },
        { location: matchCriteria.location },
      ],
    },
    skip: (page - 1) * limit,
    take: limit,
  })

  const totalMatches = await prisma.user.count({
    where: {
      AND: [
        { id: { not: userId } },
        { industry: matchCriteria.industry },
        { companyType: matchCriteria.companyType },
        { location: matchCriteria.location },
      ],
    },
  })

  return {
    matches: potentialMatches.map(match => ({
      id: match.id,
      name: match.name,
      companyName: match.companyName,
      companyType: match.companyType,
      industry: match.industry,
      location: match.location,
      description: match.description,
      website: match.website,
    })),
    totalMatches,
    currentPage: page,
    totalPages: Math.ceil(totalMatches / limit),
  }
}