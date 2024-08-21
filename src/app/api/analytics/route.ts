import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/db';

export async function GET(req: Request) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const matchAnalytics = await prisma.$queryRaw<{
      month: string;
      newMatches: number;
      interactedMatches: number;
    }[]>`
      SELECT
        DATE_FORMAT(i.createdAt, '%Y-%m') AS month,
        COUNT(CASE WHEN i.status = 'interested' THEN 1 END) AS newMatches,
        COUNT(CASE WHEN i.status != 'not interested' THEN 1 END) AS interactedMatches
      FROM MatchInteraction i
      WHERE i.userId = ${(session.user as { id: string }).id}
      GROUP BY month
      ORDER BY month DESC
      LIMIT 12;
    `;

    return NextResponse.json(matchAnalytics);
  } catch (error) {
    console.error('Analytics retrieval error:', error);
    return NextResponse.json({ error: 'Failed to retrieve analytics' }, { status: 500 });
  }
}