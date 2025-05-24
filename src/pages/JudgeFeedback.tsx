
import { useState } from 'react';
import { Award, Star, FileText, Users, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { UserRole, DebateFormat } from '@/types';

const JudgeFeedback = () => {
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [scores, setScores] = useState({
    content: 0,
    delivery: 0,
    strategy: 0,
    rebuttal: 0
  });
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const mockEvents = [
    { id: '1', title: 'Climate Change Debate Championship', format: 'british' as DebateFormat },
    { id: '2', title: 'Technology Ethics Debate', format: 'asian' as DebateFormat },
    { id: '3', title: 'Education Policy Forum', format: 'lincoln-douglas' as DebateFormat }
  ];

  const mockParticipants = [
    { id: '1', name: 'Alex Johnson', team: 'Proposition', role: 'Prime Minister' },
    { id: '2', name: 'Sarah Wilson', team: 'Proposition', role: 'Deputy Prime' },
    { id: '3', name: 'Mike Chen', team: 'Opposition', role: 'Leader Opposition' },
    { id: '4', name: 'Emma Davis', team: 'Opposition', role: 'Deputy Opposition' }
  ];

  const handleScoreChange = (category: string, value: number) => {
    setScores(prev => ({ ...prev, [category]: value }));
  };

  const handleSubmitFeedback = () => {
    setIsSubmitted(true);
  };

  const ScoreSlider = ({ label, category }: { label: string, category: string }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">1</span>
        <input
          type="range"
          min="1"
          max="10"
          value={scores[category as keyof typeof scores]}
          onChange={(e) => handleScoreChange(category, parseInt(e.target.value))}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-sm text-gray-500">10</span>
        <Badge variant="outline" className="min-w-[3rem] justify-center">
          {scores[category as keyof typeof scores]}
        </Badge>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentRole={currentRole} setCurrentRole={() => {}} />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-navy text-white py-16 px-4">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
                Judge Feedback System
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                Provide structured, constructive feedback and scoring for debate participants
              </p>
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            {!isSubmitted ? (
              <Tabs defaultValue="selection" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="selection">Event Selection</TabsTrigger>
                  <TabsTrigger value="scoring">Scoring & Feedback</TabsTrigger>
                  <TabsTrigger value="review">Review & Submit</TabsTrigger>
                </TabsList>

                <TabsContent value="selection" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Select Debate Event
                      </CardTitle>
                      <CardDescription>
                        Choose the debate event you want to provide feedback for
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="event-select">Debate Event</Label>
                        <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a debate event" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockEvents.map((event) => (
                              <SelectItem key={event.id} value={event.id}>
                                {event.title} ({event.format})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {selectedEvent && (
                        <div className="mt-6">
                          <h3 className="text-lg font-semibold mb-4">Participants</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {mockParticipants.map((participant) => (
                              <Card key={participant.id}>
                                <CardContent className="pt-4">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="font-medium">{participant.name}</p>
                                      <p className="text-sm text-gray-600">{participant.role}</p>
                                    </div>
                                    <Badge variant={participant.team === 'Proposition' ? 'default' : 'secondary'}>
                                      {participant.team}
                                    </Badge>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="scoring" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5" />
                        Performance Scoring
                      </CardTitle>
                      <CardDescription>
                        Rate each participant on key debate criteria (1-10 scale)
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <ScoreSlider label="Content & Arguments" category="content" />
                      <ScoreSlider label="Delivery & Presentation" category="delivery" />
                      <ScoreSlider label="Strategy & Structure" category="strategy" />
                      <ScoreSlider label="Rebuttal & Response" category="rebuttal" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Written Feedback
                      </CardTitle>
                      <CardDescription>
                        Provide detailed, constructive feedback for improvement
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder="Provide specific feedback on strengths, areas for improvement, and suggestions for future debates..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        rows={8}
                        className="resize-none"
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="review" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Feedback Summary
                      </CardTitle>
                      <CardDescription>
                        Review your scoring and feedback before submission
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-navy">{scores.content}</div>
                          <div className="text-sm text-gray-600">Content</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-navy">{scores.delivery}</div>
                          <div className="text-sm text-gray-600">Delivery</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-navy">{scores.strategy}</div>
                          <div className="text-sm text-gray-600">Strategy</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-navy">{scores.rebuttal}</div>
                          <div className="text-sm text-gray-600">Rebuttal</div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Written Feedback:</h4>
                        <p className="text-gray-700">{feedback || 'No feedback provided'}</p>
                      </div>

                      <Button 
                        onClick={handleSubmitFeedback}
                        className="w-full bg-navy hover:bg-navy-dark"
                        disabled={!selectedEvent || !feedback.trim()}
                      >
                        Submit Feedback
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            ) : (
              <Card className="text-center">
                <CardContent className="pt-8 pb-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2 text-navy">Feedback Submitted Successfully!</h2>
                  <p className="text-gray-600 mb-6">
                    Your feedback has been recorded and will be shared with the participants.
                  </p>
                  <Button 
                    onClick={() => {
                      setIsSubmitted(false);
                      setSelectedEvent('');
                      setScores({ content: 0, delivery: 0, strategy: 0, rebuttal: 0 });
                      setFeedback('');
                    }}
                    className="bg-navy hover:bg-navy-dark"
                  >
                    Provide Another Feedback
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default JudgeFeedback;
