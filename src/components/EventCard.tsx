
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DebateEvent, DebateFormatInfo } from '@/types';
import { Calendar, Info, Video } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type EventCardProps = {
  event: DebateEvent;
  formatInfo?: DebateFormatInfo;
};

const EventCard = ({ event, formatInfo }: EventCardProps) => {
  const eventDate = parseISO(event.date);
  const timeToEvent = formatDistanceToNow(eventDate, { addSuffix: true });
  
  // Map debate format to display text
  const formatDisplayName: Record<string, string> = {
    british: 'British Parliamentary',
    asian: 'Asian Parliamentary',
    'lincoln-douglas': 'Lincoln-Douglas',
    'public-forum': 'Public Forum',
    'karl-popper': 'Karl Popper',
    'american-parliamentary': 'American Parliamentary',
    mace: 'Mace (UK)',
    'world-schools': 'World Schools',
    'rapid-fire': 'Rapid Fire',
    freestyle: 'Freestyle',
    'one-minute-war': 'One-Minute War'
  };
  
  // Format badge color based on format type
  const getFormatBadgeColor = (format: string) => {
    switch(format) {
      case 'british':
        return 'bg-blue-100 text-blue-800';
      case 'asian':
        return 'bg-green-100 text-green-800';
      case 'lincoln-douglas':
        return 'bg-purple-100 text-purple-800';
      case 'public-forum':
        return 'bg-orange-100 text-orange-800';
      case 'karl-popper':
        return 'bg-cyan-100 text-cyan-800';
      case 'american-parliamentary':
        return 'bg-indigo-100 text-indigo-800';
      case 'mace':
        return 'bg-rose-100 text-rose-800';
      case 'world-schools':
        return 'bg-amber-100 text-amber-800';
      case 'rapid-fire':
        return 'bg-red-100 text-red-800';
      case 'freestyle':
        return 'bg-gray-100 text-gray-800';
      case 'one-minute-war':
        return 'bg-lime-100 text-lime-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-navy" />
            <span className="text-sm text-gray-500">{timeToEvent}</span>
          </div>
          <div className="flex items-center">
            <span className={`text-xs font-medium px-2 py-1 rounded ${getFormatBadgeColor(event.format)}`}>
              {formatDisplayName[event.format] || event.format}
            </span>
            
            {formatInfo && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="ml-1 h-6 w-6 p-0">
                      <Info className="h-3 w-3 text-gray-500" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <div className="text-xs space-y-1">
                      <p><span className="font-medium">Teams:</span> {formatInfo.teams}</p>
                      <p><span className="font-medium">Time:</span> {formatInfo.speakerTime}</p>
                      <p><span className="font-medium">Ideal for:</span> {formatInfo.idealFor}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
        <CardTitle className="text-lg mt-2 text-navy flex items-center">
          {event.title}
          <Video className="ml-2 h-4 w-4 text-green-600" />
        </CardTitle>
        <CardDescription className="line-clamp-2">{event.motion}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Participants:</span>
            <span className="font-medium">{event.participants.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Judges:</span>
            <span className="font-medium">{event.judges.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Rounds:</span>
            <span className="font-medium">{event.rounds}</span>
          </div>
          <div className="flex items-center text-green-600 text-xs">
            <Video className="h-3 w-3 mr-1" />
            <span>Video Conference Available</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t">
        <Link to={`/events/${event.id}`} className="w-full">
          <Button className="w-full bg-navy hover:bg-navy-dark">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
