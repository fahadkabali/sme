import { prisma } from './db'
import { getRecommendations } from './recommendations';



interface MatchCriteria {
  industry: string;
  companyType: string;
  location: string
}

interface SearchFilters {
  search?: string
  industry?: string
  companyType?: string
  location?: string
}

export async function findMatches(userId: string, page = 1, limit = 10, filters: SearchFilters = {}) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    throw new Error('User not found')
  }

  const matchCriteria: MatchCriteria = {
    industry: filters.industry || user.industry || '',
    companyType: filters.companyType || (user?.companyType === 'SME' ? 'Large Enterprise' : 'SME'),
    location: filters.location || user.location || '',
  }
  const whereConditions = {
    AND: [
      { id: { not: userId } },
      { industry: { contains: matchCriteria.industry, mode: 'insensitive' } },
      { companyType: matchCriteria.companyType },
      { location: { contains: matchCriteria.location, mode: 'insensitive' } },
      filters.search ? { OR: [{ companyName: { contains: filters.search, mode: 'insensitive' } }, { description: { contains: filters.search, mode: 'insensitive' } }] } : {},
    ],
  }

  const whereConditionsModified = whereConditions.AND.reduce((acc, current) => {
    return { ...acc, ...current };
  }, {});

  const potentialMatches = await prisma.user.findMany({
    where?: whereConditionsModified,
    skip: (page - 1) * limit,
    take: limit,
  })

  const totalMatches = await prisma.user.count({
    where?: whereConditions,
  })
  const recommendations = await getRecommendations(userId, limit)

  return {

    matches: [...potentialMatches, ...recommendations],
    totalMatches: totalMatches + recommendations.length,
    currentPage:page,
    totalPages: Math.ceil((totalMatches + recommendations.length) / limit),
  
  }
}