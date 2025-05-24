import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VideoConference from '@/components/VideoConference';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Award, ArrowLeft, Clock, UserCog, Video } from 'lucide-react';
import { UserRole, DebateEvent } from '@/types';
import { debateEvents, debateFormats } from '@/data/mockData';
import { format } from 'date-fns';

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const [currentRole, setCurrentRole] = useState<UserRole | null>('participant');
  const [event, setEvent] = useState<DebateEvent | null>(null);
  const [showVideoConference, setShowVideoConference] = useState(false);
  
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const foundEvent = debateEvents.find(e => e.id === eventId);
    setEvent(foundEvent || null);
  }, [eventId]);
  
  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header currentRole={currentRole} setCurrentRole={setCurrentRole} />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-navy mb-4">Event Not Found</h2>
            <p className="mb-6 text-gray-600">The event you're looking for doesn't exist or has been removed.</p>
            <Link to="/events">
              <Button className="bg-navy hover:bg-navy-dark">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const formatInfo = debateFormats.find(f => f.id === event.format);
  const eventDate = new Date(event.date);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header currentRole={currentRole} setCurrentRole={setCurrentRole} />
      
      <main className="flex-grow">
        {/* Page header */}
        <section className="bg-navy text-white py-12 px-4">
          <div className="container mx-auto">
            <div className="max-w-5xl mx-auto">
              <Link to="/events" className="flex items-center text-white/80 hover:text-white mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
              </Link>
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold font-playfair">
                    {event.title}
                  </h1>
                  <p className="mt-2 opacity-90">{event.motion}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="outline" className="bg-white/10 border-0 text-white">
                      {formatInfo?.title || event.format}
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-0 text-white flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      {format(eventDate, 'MMM d, yyyy')}
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-0 text-white flex items-center">
                      <Users className="mr-1 h-3 w-3" />
                      {event.participants.length} Participants
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-0 text-white flex items-center">
                      <UserCog className="mr-1 h-3 w-3" />
                      {event.judges.length} Judges
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-0 text-white flex items-center">
                      <Award className="mr-1 h-3 w-3" />
                      {event.rounds} Rounds
                    </Badge>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-navy"
                    onClick={() => setShowVideoConference(!showVideoConference)}
                  >
                    <Video className="mr-2 h-4 w-4" />
                    {showVideoConference ? 'Hide Video' : 'Join Video'}
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-navy">
                    Register
                  </Button>
                  {currentRole === 'admin' && (
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-navy">
                      Edit Event
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Video Conference Section */}
        {showVideoConference && (
          <section className="py-6 px-4 bg-gray-50">
            <div className="container mx-auto">
              <div className="max-w-5xl mx-auto">
                <VideoConference
                  eventId={event.id}
                  eventTitle={event.title}
                  isHost={currentRole === 'admin'}
                  participants={[...event.participants, ...event.judges]}
                />
              </div>
            </div>
          </section>
        )}
        
        {/* Event details section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="max-w-5xl mx-auto">
              <Tabs defaultValue="overview" className="mb-8">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  <TabsTrigger value="participants">Participants</TabsTrigger>
                  <TabsTrigger value="video-conference">Video Conference</TabsTrigger>
                  <TabsTrigger value="results">Results</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle>Event Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700">
                            {event.motion}
                          </p>
                          <p className="mt-4 text-gray-700">
                            This is an event using the {formatInfo?.title || event.format} debate format. 
                            {formatInfo && (
                              <>
                                <span> It involves {formatInfo.teams} with {formatInfo.speakerTime} speaking time. </span>
                                <span>The format features {formatInfo.structure.toLowerCase()} and is ideal for {formatInfo.idealFor.toLowerCase()}.</span>
                              </>
                            )}
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="mt-6">
                        <CardHeader className="pb-2">
                          <CardTitle>Format Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {formatInfo ? (
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h3 className="text-sm font-medium text-gray-500">Teams/Participants</h3>
                                  <p className="text-navy">{formatInfo.teams}</p>
                                </div>
                                <div>
                                  <h3 className="text-sm font-medium text-gray-500">Speaker Time</h3>
                                  <p className="text-navy">{formatInfo.speakerTime}</p>
                                </div>
                              </div>
                              
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">Structure</h3>
                                <p className="text-navy">{formatInfo.structure}</p>
                              </div>
                              
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">Ideal For</h3>
                                <p className="text-navy">{formatInfo.idealFor}</p>
                              </div>
                            </div>
                          ) : (
                            <p className="text-gray-500">No detailed information available for this format.</p>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle>Event Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-start">
                              <Calendar className="h-5 w-5 mr-3 text-navy" />
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">Date</h3>
                                <p className="text-navy">{format(eventDate, 'EEEE, MMMM d, yyyy')}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <Clock className="h-5 w-5 mr-3 text-navy" />
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">Duration</h3>
                                <p className="text-navy">{event.rounds} rounds</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <Users className="h-5 w-5 mr-3 text-navy" />
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">Participants</h3>
                                <p className="text-navy">{event.participants.length} teams</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <UserCog className="h-5 w-5 mr-3 text-navy" />
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">Judges</h3>
                                <p className="text-navy">{event.judges.length} judges</p>
                              </div>
                            </div>
                          </div>
                          
                          <Button className="w-full mt-6 bg-navy hover:bg-navy-dark">
                            Register Now
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="schedule">
                  <Card>
                    <CardHeader>
                      <CardTitle>Event Schedule</CardTitle>
                      <CardDescription>Timeline and rounds information</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-gray-500 py-8">Schedule information will be available once the event starts.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="participants">
                  <Card>
                    <CardHeader>
                      <CardTitle>Participants</CardTitle>
                      <CardDescription>Teams and judges participating in this event</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-lg font-medium mb-4">Teams</h3>
                          <ul className="space-y-2">
                            {event.participants.map((team, index) => (
                              <li key={index} className="flex items-center p-2 bg-gray-50 rounded">
                                <div className="h-8 w-8 rounded-full bg-navy text-white flex items-center justify-center mr-3">
                                  {index + 1}
                                </div>
                                <span>{team}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-4">Judges</h3>
                          <ul className="space-y-2">
                            {event.judges.map((judge, index) => (
                              <li key={index} className="flex items-center p-2 bg-gray-50 rounded">
                                <div className="h-8 w-8 rounded-full bg-navy text-white flex items-center justify-center mr-3">
                                  <UserCog className="h-4 w-4" />
                                </div>
                                <span>{judge}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="video-conference" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Video Conference</CardTitle>
                      <CardDescription>Join the live video conference for this debate event</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <VideoConference
                        eventId={event.id}
                        eventTitle={event.title}
                        isHost={currentRole === 'admin'}
                        participants={[...event.participants, ...event.judges]}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="results">
                  <Card>
                    <CardHeader>
                      <CardTitle>Results</CardTitle>
                      <CardDescription>Rankings and scores</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-gray-500 py-8">Results will be available once the event concludes.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventDetailsPage;
