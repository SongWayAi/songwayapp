
import React, { useState } from 'react';
import BottomNavigation from '../components/BottomNavigation';
import BattleCard from '../components/BattleCard';
import ArtistCard from '../components/ArtistCard';
import ArtistProfile from '../components/ArtistProfile';
import LeaderboardItem from '../components/LeaderboardItem';
import { Settings, Heart, History, Star } from 'lucide-react';

// Mock data
const mockBattles = [
  {
    id: '1',
    artist1: 'Taylor Swift',
    artist2: 'Ariana Grande',
    song1: 'Anti-Hero',
    song2: 'positions',
    thumbnail1: '/placeholder.svg',
    thumbnail2: '/placeholder.svg',
    votes1: 1250,
    votes2: 980,
  },
  {
    id: '2',
    artist1: 'Drake',
    artist2: 'The Weeknd',
    song1: 'God\'s Plan',
    song2: 'Blinding Lights',
    thumbnail1: '/placeholder.svg',
    thumbnail2: '/placeholder.svg',
    votes1: 890,
    votes2: 1100,
  },
];

const mockArtists = [
  {
    id: '1',
    name: 'Taylor Swift',
    avatar: '/placeholder.svg',
    followers: 45000,
    battlesWon: 24,
    totalBattles: 30,
    isSubscribed: true,
    isFavorite: false,
    bio: 'Pop sensation and songwriter extraordinaire',
    recentBattles: [
      { id: '1', opponent: 'Ariana Grande', song: 'Anti-Hero', result: 'won' as const, votes: 1250, date: '2 days ago' },
      { id: '2', opponent: 'Billie Eilish', song: 'Lavender Haze', result: 'lost' as const, votes: 890, date: '5 days ago' },
    ],
  },
  {
    id: '2',
    name: 'The Weeknd',
    avatar: '/placeholder.svg',
    followers: 38000,
    battlesWon: 19,
    totalBattles: 25,
    isSubscribed: false,
    isFavorite: true,
    bio: 'R&B artist with incredible vocals',
    recentBattles: [
      { id: '3', opponent: 'Drake', song: 'Blinding Lights', result: 'won' as const, votes: 1100, date: '1 day ago' },
    ],
  },
];

const mockLeaderboards = {
  week: [
    { id: '1', name: 'Taylor Swift', avatar: '/placeholder.svg', score: 2400, change: 5 },
    { id: '2', name: 'The Weeknd', avatar: '/placeholder.svg', score: 2100, change: -2 },
    { id: '3', name: 'Ariana Grande', avatar: '/placeholder.svg', score: 1950, change: 8 },
  ],
  ai: [
    { id: '1', name: 'Billie Eilish', avatar: '/placeholder.svg', score: 98.5, change: 2.1 },
    { id: '2', name: 'Taylor Swift', avatar: '/placeholder.svg', score: 97.2, change: -0.5 },
    { id: '3', name: 'Drake', avatar: '/placeholder.svg', score: 96.8, change: 1.2 },
  ],
  month: [
    { id: '1', name: 'Drake', avatar: '/placeholder.svg', score: 8900, change: 150 },
    { id: '2', name: 'Taylor Swift', avatar: '/placeholder.svg', score: 8600, change: 200 },
    { id: '3', name: 'Post Malone', avatar: '/placeholder.svg', score: 8200, change: -50 },
  ],
};

const Index = () => {
  const [activeTab, setActiveTab] = useState('battles');
  const [currentBattleIndex, setCurrentBattleIndex] = useState(0);
  const [votedBattles, setVotedBattles] = useState<Record<string, 1 | 2>>({});
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const [artists, setArtists] = useState(mockArtists);
  const [activeLeaderboard, setActiveLeaderboard] = useState<'week' | 'ai' | 'month'>('week');

  const handleVote = (battleId: string, choice: 1 | 2) => {
    setVotedBattles(prev => ({ ...prev, [battleId]: choice }));
    
    // Move to next battle after a short delay
    setTimeout(() => {
      setCurrentBattleIndex(prev => (prev + 1) % mockBattles.length);
    }, 1500);
  };

  const handleSubscribe = (artistId: string) => {
    setArtists(prev => prev.map(artist => 
      artist.id === artistId 
        ? { ...artist, isSubscribed: !artist.isSubscribed }
        : artist
    ));
  };

  const handleFavorite = (artistId: string) => {
    setArtists(prev => prev.map(artist => 
      artist.id === artistId 
        ? { ...artist, isFavorite: !artist.isFavorite }
        : artist
    ));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'battles':
        return (
          <div className="p-4 pb-20">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Song Battles
              </h1>
              <p className="text-gray-600 mt-2">Vote for your favorite songs!</p>
            </div>
            
            <BattleCard
              battle={mockBattles[currentBattleIndex]}
              onVote={handleVote}
              voted={votedBattles[mockBattles[currentBattleIndex].id]}
            />
          </div>
        );

      case 'artists':
        if (selectedArtist) {
          const artist = artists.find(a => a.id === selectedArtist);
          if (artist) {
            return (
              <ArtistProfile
                artist={artist}
                onBack={() => setSelectedArtist(null)}
                onSubscribe={handleSubscribe}
                onFavorite={handleFavorite}
              />
            );
          }
        }
        
        return (
          <div className="p-4 pb-20">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Artists
              </h1>
              <p className="text-gray-600 mt-2">Discover amazing artists</p>
            </div>
            
            <div className="space-y-4">
              {artists.map(artist => (
                <ArtistCard
                  key={artist.id}
                  artist={artist}
                  onClick={() => setSelectedArtist(artist.id)}
                  onSubscribe={handleSubscribe}
                  onFavorite={handleFavorite}
                />
              ))}
            </div>
          </div>
        );

      case 'leaderboards':
        return (
          <div className="p-4 pb-20">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Leaderboards
              </h1>
              <p className="text-gray-600 mt-2">Top performing artists</p>
            </div>
            
            <div className="flex space-x-2 mb-6">
              {[
                { id: 'week', label: 'Week Top' },
                { id: 'ai', label: 'AI Top' },
                { id: 'month', label: 'Month Best' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveLeaderboard(tab.id as 'week' | 'ai' | 'month')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeLeaderboard === tab.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            <div>
              {mockLeaderboards[activeLeaderboard].map((artist, index) => (
                <LeaderboardItem
                  key={artist.id}
                  rank={index + 1}
                  artist={artist}
                  type={activeLeaderboard}
                />
              ))}
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="p-4 pb-20">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                My Profile
              </h1>
              <p className="text-gray-600 mt-2">Your music journey</p>
            </div>
            
            <div className="space-y-6">
              {/* Profile Info */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src="/placeholder.svg"
                    alt="Profile"
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Music Lover</h3>
                    <p className="text-gray-600">@musicfan2024</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-purple-600">127</div>
                    <div className="text-sm text-gray-600">Votes Cast</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-pink-600">24</div>
                    <div className="text-sm text-gray-600">Following</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-orange-600">8</div>
                    <div className="text-sm text-gray-600">Favorites</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <button className="w-full bg-white rounded-lg p-4 flex items-center space-x-3 shadow-sm border border-gray-100">
                  <History className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-800">Voting History</span>
                </button>
                
                <button className="w-full bg-white rounded-lg p-4 flex items-center space-x-3 shadow-sm border border-gray-100">
                  <Heart className="w-5 h-5 text-pink-600" />
                  <span className="font-medium text-gray-800">Favorite Artists</span>
                </button>
                
                <button className="w-full bg-white rounded-lg p-4 flex items-center space-x-3 shadow-sm border border-gray-100">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-800">Settings</span>
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {renderContent()}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
