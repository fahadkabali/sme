import React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Building2, MapPin, Briefcase } from 'lucide-react';

interface Match {
  id: string;
  name: string;
  companyName: string;
  companyType: string;
  industry: string;
  location: string;
}

interface MatchesResponse {
  matches: Match[];
  totalMatches: number;
  currentPage: number;
  totalPages: number;
}

export default function MatchList() {
  const [matchesData, setMatchesData] = useState<MatchesResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [industry, setIndustry] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMatches(currentPage);
  }, [currentPage, searchTerm, industry, companyType, location]);

  async function fetchMatches(page: number) {
    setIsLoading(true);
    const params = new URLSearchParams({
      page: page.toString(),
      ...(searchTerm && { search: searchTerm }),
      ...(industry && { industry }),
      ...(companyType && { companyType }),
      ...(location && { location }),
    });
    
    try {
      const response = await fetch(`/api/matches?${params}`);
      if (response.ok) {
        const data = await response.json();
        setMatchesData(data);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleInteraction(matchId: string, status: string) {
    const response = await fetch('/api/matches/interact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matchId, status }),
    });

    if (response.ok) {
      fetchMatches(currentPage);
    }
  }

  const FilterInput = ({ icon: Icon, ...props }) => (
    <div className="relative">
      <Icon className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
      <input
        {...props}
        className="w-full pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );

  if (isLoading && !matchesData) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 w-full">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Matches</h2>
      </div>
      
      <div className="space-y-4">
        <div className="grid gap-4">
          <FilterInput
            icon={Search}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search matches..."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FilterInput
              icon={Briefcase}
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="Industry..."
            />
            <FilterInput
              icon={Building2}
              type="text"
              value={companyType}
              onChange={(e) => setCompanyType(e.target.value)}
              placeholder="Company Type..."
            />
            <FilterInput
              icon={MapPin}
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location..."
            />
          </div>
        </div>

        {matchesData?.matches.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No matches found.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {matchesData?.matches.map((match) => (
              <div
                key={match.id}
                className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {match.companyName}
                    </h3>
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
            ))}
          </div>
        )}

        {matchesData && matchesData.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: matchesData.totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentPage === page
                        ? 'bg-blue-500 text-white'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, matchesData.totalPages)
                )
              }
              disabled={currentPage === matchesData.totalPages}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}