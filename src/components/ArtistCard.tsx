
import React from 'react';
import { Star, Users, Trophy } from 'lucide-react';

interface Artist {
  id: string;
  name: string;
  avatar: string;
  followers: number;
  battlesWon: number;
  totalBattles: number;
  isSubscribed: boolean;
  isFavorite: boolean;
}

interface ArtistCardProps {
  artist: Artist;
  onClick: () => void;
  onSubscribe: (artistId: string) => void;
  onFavorite: (artistId: string) => void;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, onClick, onSubscribe, onFavorite }) => {
  const winRate = Math.round((artist.battlesWon / artist.totalBattles) * 100);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-4 border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4">
        <img
          src="/placeholder.svg"
          alt={artist.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        
        <div className="flex-1" onClick={onClick}>
          <h3 className="font-semibold text-lg text-gray-800">{artist.name}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>{artist.followers.toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <Trophy className="w-4 h-4 mr-1" />
              <span>{winRate}% win rate</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {artist.battlesWon} wins • {artist.totalBattles} battles
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavorite(artist.id);
            }}
            className={`p-2 rounded-full transition-colors ${
              artist.isFavorite
                ? 'bg-yellow-100 text-yellow-600'
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
            }`}
          >
            <Star className={`w-4 h-4 ${artist.isFavorite ? 'fill-current' : ''}`} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSubscribe(artist.id);
            }}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              artist.isSubscribed
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {artist.isSubscribed ? 'Following' : 'Follow'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
