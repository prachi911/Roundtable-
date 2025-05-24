
import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Calendar, Filter, Search } from 'lucide-react';
import EventCard from '@/components/EventCard';
import { DebateFormatInfo, UserRole, DebateEvent } from '@/types';
import { debateEvents, debateFormats } from '@/data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import FormatSelector from '@/components/FormatSelector';

const EventsPage = () => {
  const [currentRole, setCurrentRole] = useState<UserRole | null>('participant');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormatFilter, setSelectedFormatFilter] = useState<string | null>(null);
  
  // Filtered events based on search query and format filter
  const filteredEvents = useMemo(() => {
    return debateEvents.filter((event) => {
      const matchesSearch = searchQuery.trim() === '' || 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        event.motion.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesFormat = selectedFormatFilter === null || event.format === selectedFormatFilter;
      
      return matchesSearch && matchesFormat;
    });
  }, [searchQuery, selectedFormatFilter]);
  
  // Get format info for event cards
  const getFormatInfo = (formatId: string): DebateFormatInfo | undefined => {
    return debateFormats.find(format => format.id === formatId);
  };
  
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header currentRole={currentRole} setCurrentRole={setCurrentRole} />
      
      <main className="flex-grow">
        {/* Page header */}
        <section className="bg-navy text-white py-12 px-4">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
                Debate Events
              </h1>
              <p className="text-lg opacity-90 leading-relaxed">
                Find, join, and manage debate tournaments, competitions, and practice rounds.
              </p>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="mt-4 bg-transparent border-white text-white hover:bg-white hover:text-navy">
                    View All Debate Formats
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl text-navy">Debate Formats</DialogTitle>
                    <DialogDescription>
                      Explore all supported debate formats on our platform
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="mt-4">
                    <FormatSelector
                      selectedFormat={null}
                      onSelectFormat={() => {}}
                      showAllFormats={true}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>
        
        {/* Events section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <form onSubmit={handleSearch} className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input 
                    placeholder="Search events by title or motion..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
              
              <div className="flex gap-3 items-center">
                <div className="w-48">
                  <Select value={selectedFormatFilter || ""} onValueChange={(value) => setSelectedFormatFilter(value === "all" ? null : value)}>
                    <SelectTrigger className="w-full">
                      <div className="flex items-center">
                        <Filter className="mr-2 h-4 w-4 text-gray-500" />
                        <SelectValue placeholder="Filter by format" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Formats</SelectItem>
                      {debateFormats.map(format => (
                        <SelectItem key={format.id} value={format.id}>
                          {format.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {currentRole === 'admin' && (
                  <Button className="bg-navy hover:bg-navy-dark whitespace-nowrap">
                    <Calendar className="mr-2 h-4 w-4" />
                    Create Event
                  </Button>
                )}
              </div>
            </div>
            
            <Tabs defaultValue="upcoming" className="mb-8">
              <TabsList className="grid grid-cols-3 max-w-md mx-auto">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="registered">Registered</TabsTrigger>
                <TabsTrigger value="past">Past Events</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming" className="mt-6">
                {filteredEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map((event) => (
                      <EventCard 
                        key={event.id} 
                        event={event} 
                        formatInfo={getFormatInfo(event.format)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No upcoming events found.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="registered">
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">You are not registered for any events.</p>
                  <Button variant="outline" className="mt-4">Browse Events</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="past">
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No past events found.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventsPage;
