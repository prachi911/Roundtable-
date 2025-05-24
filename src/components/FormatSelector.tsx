import { DebateFormat, DebateFormatInfo } from '@/types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

type FormatSelectorProps = {
  selectedFormat: DebateFormat | null;
  onSelectFormat: (format: DebateFormat) => void;
  showAllFormats?: boolean;
};

const FormatSelector = ({ selectedFormat, onSelectFormat, showAllFormats = false }: FormatSelectorProps) => {
  const formats: DebateFormatInfo[] = [
    {
      id: 'british',
      title: 'British Parliamentary',
      description: '4 teams of 2 speakers, 7-minute speeches, complex motions',
      teams: '4 teams × 2 (8 debaters)',
      speakerTime: '~7 mins/speaker',
      structure: 'Independent team ranking (1st–4th), new arguments required',
      idealFor: 'University, WUDC'
    },
    {
      id: 'asian',
      title: 'Asian Parliamentary',
      description: '2 teams of 3 speakers, cross-examination, detailed rebuttals',
      teams: '2 teams × 3 (6 debaters)',
      speakerTime: '~7 mins/speaker',
      structure: 'Classic 3-on-3, interactive rebuttals, whip speeches',
      idealFor: 'Inter-school, Asia debates'
    },
    {
      id: 'lincoln-douglas',
      title: 'Lincoln-Douglas Debate',
      description: '1v1 format, multiple speech rounds, values-based resolutions',
      teams: '1 vs 1',
      speakerTime: '~6–7 mins + rebuttals',
      structure: 'Focus on morals/philosophy, individual critical thinking',
      idealFor: 'Solo debaters, high school'
    },
    {
      id: 'public-forum',
      title: 'Public Forum Debate',
      description: 'Short, lay-friendly, crossfires between speeches',
      teams: '2 teams × 2 (4 debaters)',
      speakerTime: '~4 mins/speaker',
      structure: 'Short, lay-friendly, crossfires between speeches',
      idealFor: 'High school competitions'
    },
    {
      id: 'turncoat',
      title: 'Turncoat Debate',
      description: 'Speakers switch sides midway, arguing both for and against',
      teams: '1-2 per side',
      speakerTime: '~8 mins total (4+4)',
      structure: 'First half for proposition, second half for opposition',
      idealFor: 'Critical thinking, flexibility training'
    },
    {
      id: 'rapid-fire',
      title: 'Rapid Fire Rounds',
      description: 'Fast-paced, timed rebuttals with quick topic switches',
      teams: 'Flexible (1–2 per team)',
      speakerTime: '~3 mins/speaker',
      structure: 'Quick arguments, limited prep time, rapid responses',
      idealFor: 'Quick thinking, impromptu speaking practice'
    }
  ];

  const allFormats: DebateFormatInfo[] = [
    ...formats,
    {
      id: 'karl-popper',
      title: 'Karl Popper',
      description: 'Structured, evidence-based, includes Q&A',
      teams: '2 teams × 3 (6 debaters)',
      speakerTime: '~6–8 mins/speaker',
      structure: 'Structured, evidence-based, includes Q&A',
      idealFor: 'Educational use, Europe'
    },
    {
      id: 'american-parliamentary',
      title: 'American Parliamentary',
      description: 'Simplified BP, logical with limited prep',
      teams: '2 teams × 2 (4 debaters)',
      speakerTime: '~7–8 mins/speaker',
      structure: 'Simplified BP, logical with limited prep',
      idealFor: 'College debates (USA)'
    },
    {
      id: 'mace',
      title: 'Mace (UK)',
      description: 'Traditional UK style, focused argumentation',
      teams: '2 teams × 2 (4 debaters)',
      speakerTime: '~7 mins/speaker',
      structure: 'Traditional UK style, focused argumentation',
      idealFor: 'UK schools'
    },
    {
      id: 'world-schools',
      title: 'World Schools (WSDC)',
      description: 'Hybrid of BP & AP, POIs allowed, mix of prepared/impromptu',
      teams: '2 teams × 3 (6 debaters)',
      speakerTime: '~8 mins/speaker',
      structure: 'Hybrid of BP & AP, POIs allowed, mix of prepared/impromptu',
      idealFor: 'International school debates'
    },
    {
      id: 'devils-advocate',
      title: 'Devil\'s Advocate',
      description: 'Debaters argue against their personal beliefs on controversial topics',
      teams: '1-2 per side',
      speakerTime: '~5-7 mins/speaker',
      structure: 'Focus on challenging personal biases and developing empathy',
      idealFor: 'Perspective-taking, cognitive flexibility'
    },
    {
      id: 'mock-trial',
      title: 'Mock Trials',
      description: 'Simulated court proceedings with attorneys, witnesses, and judges',
      teams: 'Multiple roles (6+ per side)',
      speakerTime: 'Varies by role',
      structure: 'Follows legal procedures with opening/closing statements, examinations',
      idealFor: 'Law students, legal education'
    },
    {
      id: 'freestyle',
      title: 'Freestyle (Custom)',
      description: 'Unstructured/open, for community or AI practice',
      teams: 'Any team size',
      speakerTime: 'Flexible',
      structure: 'Unstructured/open, for community or AI practice',
      idealFor: 'AI judging, test rounds'
    },
    {
      id: 'one-minute-war',
      title: 'One-Minute War (Custom)',
      description: 'Super fast, just one minute per speech',
      teams: 'Any',
      speakerTime: '1 min/speaker',
      structure: 'Super fast, just one minute per speech',
      idealFor: 'Warm-up games, speed training'
    }
  ];

  const displayFormats = showAllFormats ? allFormats : formats;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayFormats.map((format) => (
          <Card 
            key={format.id} 
            className={`cursor-pointer transition-all h-full ${
              selectedFormat === format.id 
                ? 'border-2 border-gold shadow-lg transform scale-[1.02]' 
                : 'border border-gray-200 hover:shadow-md hover:border-gold hover:border-opacity-50'
            }`}
            onClick={() => onSelectFormat(format.id)}
          >
            <CardHeader className="relative pb-2">
              {selectedFormat === format.id && (
                <div className="absolute top-2 right-2 bg-gold rounded-full p-1.5">
                  <Check className="h-5 w-5 text-white" />
                </div>
              )}
              <CardTitle className="text-navy text-xl">{format.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-700 text-base min-h-[60px]">
                {format.description}
              </CardDescription>
              <div className="mt-4 text-sm text-gray-600">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">Teams:</span> {format.teams}
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">Time:</span> {format.speakerTime}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Ideal for:</span> {format.idealFor}
                </div>
              </div>
              <Button 
                variant={selectedFormat === format.id ? "default" : "outline"} 
                className={`mt-6 w-full py-2.5 text-base font-medium ${
                  selectedFormat === format.id 
                    ? 'bg-navy hover:bg-navy-dark' 
                    : 'text-navy border-navy hover:bg-navy hover:text-white'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectFormat(format.id);
                }}
              >
                {selectedFormat === format.id ? 'Selected' : 'Select Format'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {!showAllFormats && (
        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            className="border-navy text-navy hover:bg-navy hover:text-white bg-white transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
            asChild
          >
            <Link to="/formats">
              View All Debate Formats
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default FormatSelector;
