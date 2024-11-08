// components/MatchCard.tsx
import React from 'react';
import Link from 'next/link';
import { Building2, Briefcase, MapPin } from 'lucide-react';

interface Match {
  id: string;
  companyName: string;
  companyType: string;
  industry: string;
  location: string;
}

interface MatchCardProps {
  match: Match;
  handleInteraction: (matchId: string, status: string) => void;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, handleInteraction }) => (
  <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
    <div className="flex flex-col md:flex-row justify-between">
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-gray-900">{match.companyName}</h3>
        <div className="space-y-1 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span>{match.companyType}</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            <span>{match.industry}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{match.location}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
        <button
          onClick={() => handleInteraction(match.id, 'interested')}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Interested
        </button>
        <button
          onClick={() => handleInteraction(match.id, 'not interested')}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Not Interested
        </button>
        <Link
          href={`/matches/${match.id}`}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center"
        >
          View Details
        </Link>
      </div>
    </div>
  </div>
);

export default MatchCard;
