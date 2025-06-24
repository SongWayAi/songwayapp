
import React from 'react';
import { ArrowLeft, Star, Users, Trophy, Play } from 'lucide-react';

interface ArtistProfileProps {
  artist: {
    id: string;
    name: string;
    avatar: string;
    followers: number;
    battlesWon: number;
    totalBattles: number;
    isSubscribed: boolean;
    isFavorite: boolean;
    bio: string;
    recentBattles: Array<{
      id: string;
      opponent: string;
      song: string;
      result: 'won' | 'lost';
      votes: number;
      date: string;
    }>;
  };
  onBack: () => void;
  onSubscribe: (artistId: string) => void;
  onFavorite: (artistId: string) => void;
}

const ArtistProfile: React.FC<ArtistProfileProps> = ({ artist, onBack, onSubscribe, onFavorite }) => {
  const winRate = Math.round((artist.battlesWon / artist.totalBattles) * 100);

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-purple-600 to-pink-600 text-white">
        <div className="flex items-center justify-between p-4">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-white hover:bg-opacity-20">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Artist Profile</h1>
          <div className="w-10" />
        </div>

        <div className="px-4 pb-6 text-center">
          <img
            src="/placeholder.svg"
            alt={artist.name}
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
          />
          <h2 className="text-2xl font-bold mb-2">{artist.name}</h2>
          <p className="text-purple-100 mb-4">{artist.bio}</p>
          
          <div className="flex justify-center space-x-6 mb-4">
            <div className="text-center">
              <div className="text-xl font-bold">{artist.followers.toLocaleString()}</div>
              <div className="text-sm text-purple-200">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{artist.battlesWon}</div>
              <div className="text-sm text-purple-200">Wins</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{winRate}%</div>
              <div className="text-sm text-purple-200">Win Rate</div>
            </div>
          </div>

          <div className="flex justify-center space-x-3">
            <button
              onClick={() => onFavorite(artist.id)}
              className={`px-4 py-2 rounded-full flex items-center space-x-2 transition-colors ${
                artist.isFavorite
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
              }`}
            >
              <Star className={`w-4 h-4 ${artist.isFavorite ? 'fill-current' : ''}`} />
              <span>{artist.isFavorite ? 'Favorited' : 'Favorite'}</span>
            </button>
            
            <button
              onClick={() => onSubscribe(artist.id)}
              className={`px-6 py-2 rounded-full flex items-center space-x-2 font-medium transition-colors ${
                artist.isSubscribed
                  ? 'bg-white text-purple-600'
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>{artist.isSubscribed ? 'Following' : 'Follow'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Battles */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-purple-600" />
          Recent Battles
        </h3>
        
        <div className="space-y-3">
          {artist.recentBattles.map((battle) => (
            <div key={battle.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    battle.result === 'won' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <span className="font-medium text-gray-800">
                    vs {battle.opponent}
                  </span>
                </div>
                <span className={`text-sm font-medium ${
                  battle.result === 'won' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {battle.result === 'won' ? 'WON' : 'LOST'}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Play className="w-4 h-4" />
                  <span>{battle.song}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span>{battle.votes} votes</span>
                  <span>{battle.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;
