
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Clock, Play, Pause, Square, RotateCcw, Mic, MicOff, Volume2 } from 'lucide-react';
import { UserRole, DebateFormat, DebateRole } from '@/types';
import { debateFormats } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const PracticeArena = () => {
  const [currentRole, setCurrentRole] = useState<UserRole | null>('participant');
  const [selectedFormat, setSelectedFormat] = useState<DebateFormat | null>(null);
  const [selectedRole, setSelectedRole] = useState<DebateRole | null>(null);
  const [motion, setMotion] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [speechNotes, setSpeechNotes] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Speech time limits based on format (in seconds)
  const getTimeLimit = (format: DebateFormat | null): number => {
    if (!format) return 420; // 7 minutes default
    
    const timeLimits: Record<DebateFormat, number> = {
      'british': 420, // 7 minutes
      'asian': 420, // 7 minutes
      'lincoln-douglas': 360, // 6 minutes
      'public-forum': 240, // 4 minutes
      'karl-popper': 480, // 8 minutes
      'american-parliamentary': 450, // 7.5 minutes
      'mace': 420, // 7 minutes
      'world-schools': 480, // 8 minutes
      'rapid-fire': 180, // 3 minutes
      'freestyle': 600, // 10 minutes
      'one-minute-war': 60 // 1 minute
    };
    
    return timeLimits[format];
  };

  const timeLimit = getTimeLimit(selectedFormat);

  // Format time display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer management
  useEffect(() => {
    if (isRecording && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRecording, isPaused]);

  // Bell notifications
  useEffect(() => {
    if (selectedFormat === 'one-minute-war' && timeElapsed === 60) {
      playBell();
      toast({
        title: "Time's Up!",
        description: "Your one-minute speech has ended.",
      });
      handleStop();
    } else if (timeElapsed === Math.floor(timeLimit * 0.5)) {
      playBell();
      toast({
        title: "Halfway Point",
        description: "You've reached the halfway mark of your speech.",
      });
    } else if (timeElapsed === timeLimit - 60) {
      playBell();
      toast({
        title: "One Minute Warning",
        description: "You have one minute remaining.",
      });
    } else if (timeElapsed === timeLimit) {
      playBell();
      toast({
        title: "Time's Up!",
        description: "Your speech time has ended.",
      });
      handleStop();
    }
  }, [timeElapsed, timeLimit, selectedFormat]);

  const playBell = () => {
    // Simple audio notification (can be replaced with actual bell sound)
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const handleStart = () => {
    if (!selectedFormat || !motion.trim()) {
      toast({
        title: "Setup Required",
        description: "Please select a format and enter a motion before starting.",
        variant: "destructive"
      });
      return;
    }
    
    setIsRecording(true);
    setIsPaused(false);
    setFeedback(null);
    toast({
      title: "Practice Started",
      description: `Your ${selectedFormat} speech has begun. Good luck!`,
    });
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
    toast({
      title: isPaused ? "Resumed" : "Paused",
      description: isPaused ? "Practice session resumed." : "Practice session paused.",
    });
  };

  const handleStop = () => {
    setIsRecording(false);
    setIsPaused(false);
    toast({
      title: "Practice Ended",
      description: "Your speech practice has ended. Review your performance!",
    });
  };

  const handleReset = () => {
    setIsRecording(false);
    setIsPaused(false);
    setTimeElapsed(0);
    setSpeechNotes('');
    setFeedback(null);
    toast({
      title: "Reset Complete",
      description: "Practice session has been reset.",
    });
  };

  const generateFeedback = () => {
    if (!speechNotes.trim()) {
      toast({
        title: "No Content",
        description: "Please add some speech notes to get feedback.",
        variant: "destructive"
      });
      return;
    }

    setIsGeneratingFeedback(true);
    
    // Simulate AI feedback generation
    setTimeout(() => {
      const feedbackText = `
**Speech Analysis & Feedback**

**Time Management:** ${timeElapsed < timeLimit ? 'Good' : 'Needs Improvement'} - You spoke for ${formatTime(timeElapsed)} out of ${formatTime(timeLimit)} allocated.

**Structure Assessment:**
- Your speech shows ${speechNotes.length > 200 ? 'substantial' : 'limited'} content development
- Consider organizing your arguments with clear signposting
- Ensure you have a strong opening and closing

**Content Suggestions:**
- Develop your arguments with specific examples and evidence
- Address potential counterarguments proactively
- Use rhetorical devices to make your speech more persuasive

**Areas for Improvement:**
- Practice timing to fully utilize your allocated speaking time
- Work on smooth transitions between arguments
- Strengthen your conclusion with a memorable call to action

**Overall Rating:** ${speechNotes.length > 300 && timeElapsed > timeLimit * 0.7 ? 'Strong' : speechNotes.length > 150 ? 'Good' : 'Developing'}

Keep practicing to improve your debate skills!
      `;
      
      setFeedback(feedbackText.trim());
      setIsGeneratingFeedback(false);
      
      toast({
        title: "Feedback Generated",
        description: "Your AI feedback is ready for review.",
      });
    }, 2000);
  };

  const debateRoles: Record<DebateFormat, DebateRole[]> = {
    'british': ['prime_minister', 'leader_opposition', 'deputy_prime', 'deputy_opposition', 'member_government', 'member_opposition', 'government_whip', 'opposition_whip'],
    'asian': ['proposition_speaker_1', 'proposition_speaker_2', 'proposition_speaker_3', 'opposition_speaker_1', 'opposition_speaker_2', 'opposition_speaker_3'],
    'lincoln-douglas': ['affirmative', 'negative'],
    'public-forum': ['affirmative', 'negative'],
    'karl-popper': ['proposition_speaker_1', 'proposition_speaker_2', 'proposition_speaker_3', 'opposition_speaker_1', 'opposition_speaker_2', 'opposition_speaker_3'],
    'american-parliamentary': ['prime_minister', 'leader_opposition', 'member_government', 'member_opposition'],
    'mace': ['proposition_speaker_1', 'proposition_speaker_2', 'opposition_speaker_1', 'opposition_speaker_2'],
    'world-schools': ['proposition_speaker_1', 'proposition_speaker_2', 'proposition_speaker_3', 'opposition_speaker_1', 'opposition_speaker_2', 'opposition_speaker_3'],
    'rapid-fire': ['affirmative', 'negative'],
    'freestyle': ['affirmative', 'negative'],
    'one-minute-war': ['affirmative', 'negative']
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentRole={currentRole} setCurrentRole={setCurrentRole} />
      
      <main className="flex-grow">
        {/* Header section */}
        <section className="bg-navy text-white py-12 px-4">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
                Practice Arena
              </h1>
              <p className="text-lg opacity-90 leading-relaxed">
                Practice timed speeches with AI feedback and analysis to improve your debate skills.
              </p>
            </div>
          </div>
        </section>

        {/* Practice section */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Setup Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-navy">Practice Setup</CardTitle>
                  <CardDescription>Configure your practice session</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Debate Format</label>
                    <Select value={selectedFormat || ""} onValueChange={(value) => setSelectedFormat(value as DebateFormat)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a format" />
                      </SelectTrigger>
                      <SelectContent>
                        {debateFormats.map(format => (
                          <SelectItem key={format.id} value={format.id}>
                            {format.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedFormat && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Speaker Role</label>
                      <Select value={selectedRole || ""} onValueChange={(value) => setSelectedRole(value as DebateRole)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          {debateRoles[selectedFormat].map(role => (
                            <SelectItem key={role} value={role}>
                              {role.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-2">Motion</label>
                    <Textarea
                      placeholder="Enter the debate motion or topic..."
                      value={motion}
                      onChange={(e) => setMotion(e.target.value)}
                      rows={3}
                    />
                  </div>

                  {selectedFormat && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <span className="text-sm text-gray-600">Time Limit:</span>
                      <Badge variant="outline">{formatTime(timeLimit)}</Badge>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Timer Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-navy flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Speech Timer
                  </CardTitle>
                  <CardDescription>Track your speaking time</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-navy mb-2">
                      {formatTime(timeElapsed)}
                    </div>
                    <div className="text-sm text-gray-500">
                      of {formatTime(timeLimit)}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          timeElapsed >= timeLimit ? 'bg-red-500' : 
                          timeElapsed >= timeLimit * 0.8 ? 'bg-amber-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min((timeElapsed / timeLimit) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 justify-center">
                    {!isRecording ? (
                      <Button onClick={handleStart} className="bg-navy hover:bg-navy-dark">
                        <Play className="mr-2 h-4 w-4" />
                        Start
                      </Button>
                    ) : (
                      <>
                        <Button onClick={handlePause} variant="outline">
                          {isPaused ? <Play className="mr-2 h-4 w-4" /> : <Pause className="mr-2 h-4 w-4" />}
                          {isPaused ? 'Resume' : 'Pause'}
                        </Button>
                        <Button onClick={handleStop} variant="destructive">
                          <Square className="mr-2 h-4 w-4" />
                          Stop
                        </Button>
                      </>
                    )}
                    <Button onClick={handleReset} variant="outline">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reset
                    </Button>
                  </div>

                  {isRecording && (
                    <div className="flex items-center justify-center gap-2 text-red-500 animate-pulse">
                      <Mic className="h-4 w-4" />
                      <span className="text-sm font-medium">Recording...</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Speech Notes */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-navy">Speech Notes & Practice</CardTitle>
                <CardDescription>
                  Write your speech outline or key points here. This will be used for AI feedback.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Write your speech outline, arguments, or notes here..."
                  value={speechNotes}
                  onChange={(e) => setSpeechNotes(e.target.value)}
                  rows={8}
                  className="mb-4"
                />
                
                <div className="flex gap-4 items-center">
                  <Button 
                    onClick={generateFeedback} 
                    disabled={isGeneratingFeedback || !speechNotes.trim()}
                    className="bg-navy hover:bg-navy-dark"
                  >
                    {isGeneratingFeedback ? 'Generating...' : 'Get AI Feedback'}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/motion-analysis')}
                  >
                    Motion Analysis Tool
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Feedback Section */}
            {feedback && (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="text-navy">AI Feedback</CardTitle>
                  <CardDescription>
                    Analysis of your speech practice and suggestions for improvement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    {feedback.split('\n').map((line, index) => (
                      <div key={index} className="mb-2">
                        {line.startsWith('**') && line.endsWith('**') ? (
                          <h4 className="font-semibold text-navy">{line.slice(2, -2)}</h4>
                        ) : line.startsWith('**') ? (
                          <span className="font-semibold">{line.slice(2)}</span>
                        ) : (
                          <p className="text-gray-700">{line}</p>
                        )}
                      </div>
                    ))}
                  </div>
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

export default PracticeArena;
