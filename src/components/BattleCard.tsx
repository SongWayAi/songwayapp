
import React from 'react';
import { Play, Heart } from 'lucide-react';

interface Battle {
  id: string;
  artist1: string;
  artist2: string;
  song1: string;
  song2: string;
  thumbnail1: string;
  thumbnail2: string;
  votes1: number;
  votes2: number;
}

interface BattleCardProps {
  battle: Battle;
  onVote: (battleId: string, choice: 1 | 2) => void;
  voted?: 1 | 2 | null;
}

const BattleCard: React.FC<BattleCardProps> = ({ battle, onVote, voted }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 text-white text-center">
        <h3 className="text-lg font-bold">Battle Arena</h3>
        <p className="text-sm opacity-90">Choose your favorite!</p>
      </div>
      
      <div className="p-4 space-y-4">
        {/* First Video */}
        <div className={`relative rounded-lg overflow-hidden transition-all duration-500 ${
          voted === 2 ? 'opacity-30 scale-95' : 'opacity-100 scale-100'
        }`}>
          <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
            <img 
              src="/placeholder.svg" 
              alt={battle.song1}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <Play className="text-white w-12 h-12" />
            </div>
          </div>
          <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50">
            <h4 className="font-semibold text-gray-800">{battle.artist1}</h4>
            <p className="text-sm text-gray-600">{battle.song1}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500">{battle.votes1} votes</span>
              {!voted && (
                <button
                  onClick={() => onVote(battle.id, 1)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  Vote
                </button>
              )}
              {voted === 1 && (
                <div className="flex items-center text-purple-600">
                  <Heart className="w-4 h-4 mr-1 fill-current" />
                  <span className="text-sm font-medium">Your choice!</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* VS Divider */}
        <div className="text-center">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full font-bold text-sm">
            VS
          </span>
        </div>

        {/* Second Video */}
        <div className={`relative rounded-lg overflow-hidden transition-all duration-500 ${
          voted === 1 ? 'opacity-30 scale-95' : 'opacity-100 scale-100'
        }`}>
          <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
            <img 
              src="/placeholder.svg" 
              alt={battle.song2}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <Play className="text-white w-12 h-12" />
            </div>
          </div>
          <div className="p-3 bg-gradient-to-r from-pink-50 to-purple-50">
            <h4 className="font-semibold text-gray-800">{battle.artist2}</h4>
            <p className="text-sm text-gray-600">{battle.song2}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500">{battle.votes2} votes</span>
              {!voted && (
                <button
                  onClick={() => onVote(battle.id, 2)}
                  className="bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-pink-700 transition-colors"
                >
                  Vote
                </button>
              )}
              {voted === 2 && (
                <div className="flex items-center text-pink-600">
                  <Heart className="w-4 h-4 mr-1 fill-current" />
                  <span className="text-sm font-medium">Your choice!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleCard;
