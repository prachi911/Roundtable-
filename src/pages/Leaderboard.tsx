import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trophy, Medal, Award, Search, Filter, Users } from 'lucide-react';

// Types for our leaderboard entries
interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  institution: string;
  score: number;
  wins: number;
  losses: number;
  tournaments: number;
  badges: string[];
}

// Sample data for the leaderboard
const sampleDebaters: LeaderboardEntry[] = [
  {
    id: '1',
    rank: 1,
    name: 'Prachi B',
    avatar: 'https://i.imgur.com/8zXRwCj.jpg',
    institution: 'RCOEM',
    score: 2850,
    wins: 42,
    losses: 8,
    tournaments: 15,
    badges: ['Tournament Champion', 'Best Speaker', 'Rising Star']
  },
  {
    id: '2',
    rank: 2,
    name: 'Aditya Singh',
    avatar: 'https://i.imgur.com/cWPz7oj.jpg',
    institution: 'RCOEM',
    score: 2720,
    wins: 38,
    losses: 12,
    tournaments: 14,
    badges: ['Finalist', 'Best POI']
  },
  {
    id: '3',
    rank: 3,
    name: 'Atharava Rakhshak',
    avatar: 'https://i.imgur.com/QLrDYNb.jpg',
    institution: 'RCOEM',
    score: 2680,
    wins: 36,
    losses: 14,
    tournaments: 13,
    badges: ['Semi-finalist', 'Novice Champion']
  },
  {
    id: '4',
    rank: 4,
    name: 'Rahul Mehta',
    avatar: 'https://i.imgur.com/JYvBF7d.jpg',
    institution: 'Delhi University',
    score: 2590,
    wins: 34,
    losses: 16,
    tournaments: 12,
    badges: ['Quarter-finalist']
  },
  {
    id: '5',
    rank: 5,
    name: 'Ananya Sharma',
    avatar: 'https://i.imgur.com/L5QT4T9.jpg',
    institution: 'IIT Bombay',
    score: 2510,
    wins: 32,
    losses: 18,
    tournaments: 12,
    badges: ['Most Improved']
  },
  {
    id: '6',
    rank: 6,
    name: 'Vikram Patel',
    avatar: 'https://i.imgur.com/3jMc0a2.jpg',
    institution: 'BITS Pilani',
    score: 2480,
    wins: 30,
    losses: 20,
    tournaments: 11,
    badges: ['Best Rebuttal']
  },
  {
    id: '7',
    rank: 7,
    name: 'Neha Gupta',
    avatar: 'https://i.imgur.com/K2bBz0m.jpg',
    institution: 'St. Xavier\'s College',
    score: 2420,
    wins: 28,
    losses: 22,
    tournaments: 10,
    badges: ['Best Novice']
  },
  {
    id: '8',
    rank: 8,
    name: 'Arjun Reddy',
    avatar: 'https://i.imgur.com/9XD3lxF.jpg',
    institution: 'NLSIU Bangalore',
    score: 2380,
    wins: 26,
    losses: 24,
    tournaments: 10,
    badges: ['Most Entertaining']
  },
  {
    id: '9',
    rank: 9,
    name: 'Zara Khan',
    avatar: 'https://i.imgur.com/5GThfnb.jpg',
    institution: 'Ashoka University',
    score: 2340,
    wins: 24,
    losses: 26,
    tournaments: 9,
    badges: ['Best Analysis']
  },
  {
    id: '10',
    rank: 10,
    name: 'Rohan Joshi',
    avatar: 'https://i.imgur.com/QUyPJ3C.jpg',
    institution: 'SRCC Delhi',
    score: 2290,
    wins: 22,
    losses: 28,
    tournaments: 9,
    badges: ['Most Improved']
  }
];

const sampleTeams: LeaderboardEntry[] = [
  {
    id: '1',
    rank: 1,
    name: 'RCOEM Titans',
    avatar: 'https://i.imgur.com/8zXRwCj.jpg',
    institution: 'RCOEM',
    score: 3200,
    wins: 48,
    losses: 12,
    tournaments: 18,
    badges: ['National Champions', 'Best Team']
  },
  {
    id: '2',
    rank: 2,
    name: 'IIT-B Wordmasters',
    avatar: 'https://i.imgur.com/L5QT4T9.jpg',
    institution: 'IIT Bombay',
    score: 3050,
    wins: 45,
    losses: 15,
    tournaments: 17,
    badges: ['Runners-up', 'Most Consistent']
  },
  {
    id: '3',
    rank: 3,
    name: 'NLSIU Orators',
    avatar: 'https://i.imgur.com/9XD3lxF.jpg',
    institution: 'NLSIU Bangalore',
    score: 2980,
    wins: 43,
    losses: 17,
    tournaments: 16,
    badges: ['Semi-finalists', 'Best Research']
  },
  {
    id: '4',
    rank: 4,
    name: 'Ashoka Debaters',
    avatar: 'https://i.imgur.com/5GThfnb.jpg',
    institution: 'Ashoka University',
    score: 2890,
    wins: 40,
    losses: 20,
    tournaments: 15,
    badges: ['Quarter-finalists']
  },
  {
    id: '5',
    rank: 5,
    name: 'BITS Eloquence',
    avatar: 'https://i.imgur.com/3jMc0a2.jpg',
    institution: 'BITS Pilani',
    score: 2820,
    wins: 38,
    losses: 22,
    tournaments: 14,
    badges: ['Most Strategic']
  }
];

const sampleInstitutions: LeaderboardEntry[] = [
  {
    id: '1',
    rank: 1,
    name: 'RCOEM',
    avatar: 'https://i.imgur.com/8zXRwCj.jpg',
    institution: 'Nagpur',
    score: 8500,
    wins: 120,
    losses: 40,
    tournaments: 30,
    badges: ['Institution of the Year', 'Most Active']
  },
  {
    id: '2',
    rank: 2,
    name: 'IIT Bombay',
    avatar: 'https://i.imgur.com/L5QT4T9.jpg',
    institution: 'Mumbai',
    score: 8200,
    wins: 115,
    losses: 45,
    tournaments: 28,
    badges: ['Best Training Program', 'Most Improved Institution']
  },
  {
    id: '3',
    rank: 3,
    name: 'NLSIU',
    avatar: 'https://i.imgur.com/9XD3lxF.jpg',
    institution: 'Bangalore',
    score: 7900,
    wins: 110,
    losses: 50,
    tournaments: 26,
    badges: ['Most Consistent', 'Best Novice Program']
  },
  {
    id: '4',
    rank: 4,
    name: 'Ashoka University',
    avatar: 'https://i.imgur.com/5GThfnb.jpg',
    institution: 'Sonipat',
    score: 7600,
    wins: 105,
    losses: 55,
    tournaments: 25,
    badges: ['Rising Institution']
  },
  {
    id: '5',
    rank: 5,
    name: 'BITS Pilani',
    avatar: 'https://i.imgur.com/3jMc0a2.jpg',
    institution: 'Pilani',
    score: 7300,
    wins: 100,
    losses: 60,
    tournaments: 24,
    badges: ['Most Tournaments Hosted']
  }
];

const LeaderboardPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  // Filter function for the leaderboard entries
  const filterEntries = (entries: LeaderboardEntry[]) => {
    return entries.filter(entry => {
      const matchesSearch = 
        entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.institution.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filterBy === 'all') return matchesSearch;
      if (filterBy === 'badges') return matchesSearch && entry.badges.length > 0;
      
      return matchesSearch;
    });
  };

  // Render a badge with appropriate color
  const renderBadge = (badge: string) => {
    let variant = 'default';
    
    if (badge.includes('Champion') || badge.includes('Best')) {
      variant = 'gold';
    } else if (badge.includes('Finalist') || badge.includes('Runner')) {
      variant = 'silver';
    }
    
    return (
      <Badge key={badge} variant={variant as any} className="mr-1 mb-1">
        {badge}
      </Badge>
    );
  };

  // Render a leaderboard entry
  const renderLeaderboardEntry = (entry: LeaderboardEntry, index: number) => {
    // Highlight for top 3
    const isTopThree = entry.rank <= 3;
    const rankIcon = () => {
      if (entry.rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />;
      if (entry.rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
      if (entry.rank === 3) return <Award className="h-5 w-5 text-amber-700" />;
      return <span className="font-bold text-gray-500">{entry.rank}</span>;
    };

    return (
      <div 
        key={entry.id}
        className={`flex items-center p-4 border-b ${isTopThree ? 'bg-gold/5' : ''}`}
      >
        <div className="flex items-center justify-center w-10">
          {rankIcon()}
        </div>
        <div className="flex items-center flex-1 ml-4">
          <Avatar className="h-10 w-10 mr-4">
            <AvatarImage src={entry.avatar} alt={entry.name} />
            <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{entry.name}</div>
            <div className="text-sm text-gray-500">{entry.institution}</div>
          </div>
        </div>
        <div className="hidden md:flex flex-wrap justify-end max-w-[200px] ml-2">
          {entry.badges.map(badge => renderBadge(badge))}
        </div>
        <div className="hidden sm:block text-right w-20">
          <div className="font-bold">{entry.score}</div>
          <div className="text-sm text-gray-500">points</div>
        </div>
        <div className="hidden lg:block text-right w-24">
          <div className="font-medium text-green-600">{entry.wins}W</div>
          <div className="font-medium text-red-600">{entry.losses}L</div>
        </div>
        <div className="hidden xl:block text-right w-24">
          <div className="text-sm text-gray-500">{entry.tournaments} tournaments</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentRole={null} setCurrentRole={() => {}} />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-navy text-white py-12 px-4">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-playfair leading-tight">
                Debate <span className="text-gold">Leaderboard</span>
              </h1>
              <p className="text-lg opacity-90 mb-6">
                Track the top performers in the debate community and see where you stand
              </p>
            </div>
          </div>
        </section>
        
        {/* Leaderboard section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="max-w-5xl mx-auto">
              {/* Search and filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by name or institution..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="text-gray-400 h-4 w-4" />
                  <Select value={filterBy} onValueChange={setFilterBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Entries</SelectItem>
                      <SelectItem value="badges">With Badges</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Tabs for different leaderboards */}
              <Tabs defaultValue="debaters" className="mb-8">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="debaters">Individual Debaters</TabsTrigger>
                  <TabsTrigger value="teams">Teams</TabsTrigger>
                  <TabsTrigger value="institutions">Institutions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="debaters">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Trophy className="h-5 w-5 text-gold mr-2" />
                        Top Individual Debaters
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="bg-gray-100 text-sm font-medium text-gray-500 flex p-4 border-b">
                        <div className="w-10">Rank</div>
                        <div className="flex-1 ml-4">Debater</div>
                        <div className="hidden md:block max-w-[200px] text-right ml-2">Achievements</div>
                        <div className="hidden sm:block w-20 text-right">Score</div>
                        <div className="hidden lg:block w-24 text-right">Record</div>
                        <div className="hidden xl:block w-24 text-right">Events</div>
                      </div>
                      {filterEntries(sampleDebaters).map((entry, index) => 
                        renderLeaderboardEntry(entry, index)
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="teams">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Users className="h-5 w-5 text-gold mr-2" />
                        Top Debate Teams
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="bg-gray-100 text-sm font-medium text-gray-500 flex p-4 border-b">
                        <div className="w-10">Rank</div>
                        <div className="flex-1 ml-4">Team</div>
                        <div className="hidden md:block max-w-[200px] text-right ml-2">Achievements</div>
                        <div className="hidden sm:block w-20 text-right">Score</div>
                        <div className="hidden lg:block w-24 text-right">Record</div>
                        <div className="hidden xl:block w-24 text-right">Events</div>
                      </div>
                      {filterEntries(sampleTeams).map((entry, index) => 
                        renderLeaderboardEntry(entry, index)
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="institutions">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Award className="h-5 w-5 text-gold mr-2" />
                        Top Institutions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="bg-gray-100 text-sm font-medium text-gray-500 flex p-4 border-b">
                        <div className="w-10">Rank</div>
                        <div className="flex-1 ml-4">Institution</div>
                        <div className="hidden md:block max-w-[200px] text-right ml-2">Achievements</div>
                        <div className="hidden sm:block w-20 text-right">Score</div>
                        <div className="hidden lg:block w-24 text-right">Record</div>
                        <div className="hidden xl:block w-24 text-right">Events</div>
                      </div>
                      {filterEntries(sampleInstitutions).map((entry, index) => 
                        renderLeaderboardEntry(entry, index)
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              
              {/* Explanation */}
              <div className="mt-12 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-navy mb-4">How Rankings Work</h3>
                <p className="text-gray-700 mb-4">
                  Rankings on Debate King are calculated based on a combination of factors including:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                  <li>Tournament performance (wins, losses, advancement)</li>
                  <li>Speaker points and judge feedback</li>
                  <li>Quality of competition</li>
                  <li>Consistency across tournaments</li>
                  <li>Recent performance (with more weight given to recent tournaments)</li>
                </ul>
                <p className="text-gray-700">
                  Rankings are updated weekly. To appear on the leaderboard, participants must have competed in at least 3 tournaments in the past 12 months.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LeaderboardPage;
