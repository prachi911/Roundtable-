
import { useState } from 'react';
import { Search, BookOpen, Quote, TrendingUp, ExternalLink, Copy, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { UserRole } from '@/types';

const ResearchAssistant = () => {
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResults = [
        {
          type: 'statistic',
          title: 'Global Climate Change Statistics',
          content: '97% of actively publishing climate scientists agree that climate change is primarily caused by human activities.',
          source: 'NASA Climate Change',
          url: 'https://climate.nasa.gov',
          credibility: 'high'
        },
        {
          type: 'quote',
          title: 'Expert Opinion on Renewable Energy',
          content: '"The transition to renewable energy is not just an environmental imperative, but an economic opportunity that will create millions of jobs worldwide."',
          source: 'Dr. Jane Smith, Energy Policy Institute',
          url: 'https://example.com',
          credibility: 'high'
        },
        {
          type: 'fact',
          title: 'Economic Impact of Green Technology',
          content: 'The global renewable energy market is expected to reach $1.5 trillion by 2025, with solar and wind leading the growth.',
          source: 'International Energy Agency',
          url: 'https://iea.org',
          credibility: 'high'
        }
      ];
      
      setResults(mockResults);
      setIsSearching(false);
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'statistic':
        return <TrendingUp className="h-4 w-4" />;
      case 'quote':
        return <Quote className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getCredibilityColor = (credibility: string) => {
    switch (credibility) {
      case 'high':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentRole={currentRole} setCurrentRole={() => {}} />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-navy text-white py-16 px-4">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
                Research Assistant
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                Find credible facts, statistics, quotes, and references to strengthen your debate arguments
              </p>
            </div>
          </div>
        </section>

        {/* Search section */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-navy">
                  <Search className="h-5 w-5" />
                  Research Query
                </CardTitle>
                <CardDescription>
                  Enter your research topic or question to find relevant facts, statistics, and expert opinions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., climate change statistics, renewable energy benefits..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <Button 
                    onClick={handleSearch}
                    disabled={isSearching || !searchQuery.trim()}
                    className="bg-navy hover:bg-navy-dark"
                  >
                    {isSearching ? 'Searching...' : 'Search'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Results section */}
        {results.length > 0 && (
          <section className="py-8 px-4 bg-gray-50">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold mb-6 text-navy font-playfair">Research Results</h2>
              
              <Tabs defaultValue="all" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All Results</TabsTrigger>
                  <TabsTrigger value="statistics">Statistics</TabsTrigger>
                  <TabsTrigger value="quotes">Quotes</TabsTrigger>
                  <TabsTrigger value="facts">Facts</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-4">
                  {results.map((result, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(result.type)}
                            <CardTitle className="text-lg">{result.title}</CardTitle>
                          </div>
                          <Badge className={getCredibilityColor(result.credibility)}>
                            {result.credibility} credibility
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 mb-4">{result.content}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>Source: {result.source}</span>
                          <ExternalLink className="h-3 w-3" />
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(result.content)}
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(result.url, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Source
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="statistics">
                  {results.filter(r => r.type === 'statistic').map((result, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5" />
                          {result.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700">{result.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="quotes">
                  {results.filter(r => r.type === 'quote').map((result, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Quote className="h-5 w-5" />
                          {result.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <blockquote className="border-l-4 border-navy pl-4 italic text-gray-700">
                          {result.content}
                        </blockquote>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="facts">
                  {results.filter(r => r.type === 'fact').map((result, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5" />
                          {result.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700">{result.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ResearchAssistant;
