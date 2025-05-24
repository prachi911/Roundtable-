
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type MotionCardProps = {
  motion: string;
  index: number;
};

const MotionCard = ({ motion, index }: MotionCardProps) => {
  // Format the motion ID for URL parameters
  const motionForUrl = encodeURIComponent(motion);
  
  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-lg border-l-4 border-l-navy">
      <CardHeader className="pb-2">
        <CardDescription className="text-sm text-gray-500">Motion #{index + 1}</CardDescription>
        <CardTitle className="text-lg font-medium leading-tight text-navy">
          {motion}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex items-end pt-0">
        <Link to={`/motion-analysis?motion=${motionForUrl}`} className="w-full">
          <Button variant="outline" className="w-full text-navy border-navy hover:bg-navy hover:text-white">
            <span>Analyze</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default MotionCard;
