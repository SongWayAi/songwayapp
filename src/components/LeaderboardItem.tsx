
import React from 'react';
import { Trophy, Crown, Medal } from 'lucide-react';

interface LeaderboardItemProps {
  rank: number;
  artist: {
    id: string;
    name: string;
    avatar: string;
    score: number;
    change?: number;
  };
  type: 'week' | 'ai' | 'month';
}

const LeaderboardItem: React.FC<LeaderboardItemProps> = ({ rank, artist, type }) => {
  const getRankIcon = () => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-orange-600" />;
    return null;
  };

  const getRankDisplay = () => {
    if (rank <= 3) return getRankIcon();
    return <span className="text-lg font-bold text-gray-500">#{rank}</span>;
  };

  const getChangeColor = () => {
    if (!artist.change) return '';
    return artist.change > 0 ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 mb-3">
      <div className="w-8 flex justify-center">
        {getRankDisplay()}
      </div>
      
      <img
        src="/placeholder.svg"
        alt={artist.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{artist.name}</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>{artist.score} {type === 'ai' ? 'AI score' : 'votes'}</span>
          {artist.change && (
            <span className={`font-medium ${getChangeColor()}`}>
              {artist.change > 0 ? '+' : ''}{artist.change}
            </span>
          )}
        </div>
      </div>
      
      {rank === 1 && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
          TOP
        </div>
      )}
    </div>
  );
};

export default LeaderboardItem;
