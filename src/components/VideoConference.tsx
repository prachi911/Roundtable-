
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Video, VideoOff, Mic, MicOff, Users, Settings, Phone, PhoneOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type VideoConferenceProps = {
  eventId: string;
  eventTitle: string;
  isHost?: boolean;
  participants: string[];
};

const VideoConference = ({ eventId, eventTitle, isHost = false, participants }: VideoConferenceProps) => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected');
  const { toast } = useToast();

  useEffect(() => {
    // Simulate connection process
    if (isConnected) {
      setConnectionStatus('connecting');
      const timer = setTimeout(() => {
        setConnectionStatus('connected');
        toast({
          title: "Connected to Video Conference",
          description: `Joined ${eventTitle} debate room`,
        });
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setConnectionStatus('disconnected');
    }
  }, [isConnected, eventTitle, toast]);

  const handleJoinCall = () => {
    setIsConnected(true);
  };

  const handleLeaveCall = () => {
    setIsConnected(false);
    toast({
      title: "Left Video Conference",
      description: "You have disconnected from the debate room",
    });
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    toast({
      title: isVideoOn ? "Camera Off" : "Camera On",
      description: `Video ${isVideoOn ? 'disabled' : 'enabled'}`,
    });
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    toast({
      title: isAudioOn ? "Microphone Off" : "Microphone On", 
      description: `Audio ${isAudioOn ? 'muted' : 'unmuted'}`,
    });
  };

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Video className="mr-2 h-5 w-5" />
            Join Video Conference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-gray-600">Ready to join the video conference for:</p>
            <p className="font-semibold text-navy">{eventTitle}</p>
            <div className="flex items-center justify-center space-x-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500">{participants.length} participants expected</span>
            </div>
            <Button onClick={handleJoinCall} className="bg-green-600 hover:bg-green-700">
              <Video className="mr-2 h-4 w-4" />
              Join Conference
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Connection Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge variant={connectionStatus === 'connected' ? 'default' : 'secondary'}>
            {connectionStatus === 'connecting' && 'Connecting...'}
            {connectionStatus === 'connected' && 'Connected'}
            {connectionStatus === 'disconnected' && 'Disconnected'}
          </Badge>
          {isHost && (
            <Badge variant="outline" className="bg-gold text-navy">
              Host
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Users className="h-4 w-4" />
          <span>{participants.length} participants</span>
        </div>
      </div>

      {/* Video Conference Area */}
      <Card className="bg-gray-900 text-white">
        <CardContent className="p-6">
          <div className="aspect-video bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
            {connectionStatus === 'connecting' ? (
              <div className="text-center">
                <div className="animate-pulse mb-2">
                  <Video className="h-12 w-12 mx-auto text-gray-400" />
                </div>
                <p className="text-gray-400">Connecting to video conference...</p>
              </div>
            ) : (
              <div className="text-center">
                <Video className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-400">Video conference active</p>
                <p className="text-xs text-gray-500 mt-1">In a real implementation, this would show live video feeds</p>
              </div>
            )}
          </div>

          {/* Participants List */}
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Participants ({participants.length})</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {participants.map((participant, index) => (
                <div key={index} className="flex items-center space-x-2 text-xs bg-gray-800 rounded px-2 py-1">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="truncate">{participant}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant={isAudioOn ? "secondary" : "destructive"}
              size="icon"
              onClick={toggleAudio}
              className="rounded-full"
            >
              {isAudioOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
            </Button>
            
            <Button
              variant={isVideoOn ? "secondary" : "destructive"}
              size="icon"
              onClick={toggleVideo}
              className="rounded-full"
            >
              {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
            </Button>
            
            <Button variant="outline" size="icon" className="rounded-full">
              <Settings className="h-4 w-4" />
            </Button>
            
            <Button
              variant="destructive"
              onClick={handleLeaveCall}
              className="rounded-full"
            >
              <PhoneOff className="mr-2 h-4 w-4" />
              Leave
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoConference;
