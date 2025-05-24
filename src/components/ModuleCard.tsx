
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { ModuleInfo } from '@/types';

type ModuleCardProps = {
  module: ModuleInfo;
};

const ModuleCard = ({ module }: ModuleCardProps) => {
  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="bg-navy/10 p-3 rounded-full">
            {module.icon}
          </div>
          {module.comingSoon && (
            <span className="text-xs font-medium bg-amber-100 text-amber-800 px-2 py-1 rounded">
              Coming Soon
            </span>
          )}
        </div>
        <CardTitle className="text-xl font-bold mt-3 text-navy">{module.title}</CardTitle>
        <CardDescription>{module.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
      </CardContent>
      <CardFooter>
        {module.comingSoon ? (
          <Button variant="outline" className="w-full" disabled>
            Coming Soon
          </Button>
        ) : (
          <Link to={module.path} className="w-full">
            <Button className="w-full bg-navy hover:bg-navy-dark">
              <span>Access Module</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default ModuleCard;
