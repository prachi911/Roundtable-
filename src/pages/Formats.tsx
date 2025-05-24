import { useState } from 'react';
import Header from '@/components/Header';
import { UserRole } from '@/types';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DebateFormat } from '@/types';
import { 
  Award, 
  Users, 
  Clock, 
  Lightbulb, 
  Scale, 
  Gavel, 
  BookOpen, 
  Presentation, 
  Sparkles, 
  Zap, 
  RefreshCw, 
  Skull, 
  Scroll 
} from 'lucide-react';

// Define format categories
type FormatCategory = 'popular' | 'academic' | 'competitive' | 'specialized';

// Define format details with additional information
interface FormatDetails {
  id: DebateFormat;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: FormatCategory;
  timeFormat: string;
  teamSize: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  origin: string;
  keyFeatures: string[];
}

const formatDetails: FormatDetails[] = [
  {
    id: 'british',
    title: 'British Parliamentary',
    description: 'Four teams of two compete, with two teams on each side of the motion. Each speaker delivers a 7-minute speech.',
    icon: <Presentation size={24} />,
    category: 'popular',
    timeFormat: '7 minutes per speaker',
    teamSize: '2 speakers per team, 4 teams total',
    difficulty: 'Advanced',
    origin: 'United Kingdom',
    keyFeatures: [
      'Four teams: Opening Government, Opening Opposition, Closing Government, Closing Opposition',
      'Emphasis on analysis and extension of arguments',
      'Used in the World Universities Debating Championship'
    ]
  },
  {
    id: 'asian',
    title: 'Asian Parliamentary',
    description: 'Similar to British Parliamentary but with three speakers per team and a reply speech.',
    icon: <Users size={24} />,
    category: 'competitive',
    timeFormat: '7 minutes main speeches, 4 minutes reply',
    teamSize: '3 speakers per team',
    difficulty: 'Advanced',
    origin: 'Asia',
    keyFeatures: [
      'Government and Opposition teams',
      'Reply speeches delivered by first or second speakers',
      'Popular in Asian university circuits'
    ]
  },
  {
    id: 'lincoln-douglas',
    title: 'Lincoln-Douglas',
    description: 'One-on-one debate format focusing on logic, ethical values, and philosophy.',
    icon: <Scale size={24} />,
    category: 'academic',
    timeFormat: 'Varying speech times (6-3-7-3-4-6-3 minutes)',
    teamSize: 'Individual debaters',
    difficulty: 'Intermediate',
    origin: 'United States',
    keyFeatures: [
      'Value-based argumentation',
      'Emphasis on philosophical frameworks',
      'Popular in American high school competitions'
    ]
  },
  {
    id: 'public-forum',
    title: 'Public Forum',
    description: 'Team debate designed to be accessible to the public with a focus on current events.',
    icon: <Users size={24} />,
    category: 'popular',
    timeFormat: '4-minute speeches and 3-minute crossfires',
    teamSize: '2 speakers per team',
    difficulty: 'Beginner',
    origin: 'United States',
    keyFeatures: [
      'Coin toss determines sides',
      'Emphasis on real-world impacts and evidence',
      'Accessible to audiences without debate background'
    ]
  },
  {
    id: 'karl-popper',
    title: 'Karl Popper',
    description: 'Three-on-three format emphasizing critical thinking and open society values.',
    icon: <Lightbulb size={24} />,
    category: 'academic',
    timeFormat: '6-minute speeches, 3-minute cross-examinations',
    teamSize: '3 speakers per team',
    difficulty: 'Intermediate',
    origin: 'Open Society Institute',
    keyFeatures: [
      'Cross-examination periods',
      'Emphasis on critical thinking',
      'Popular in international school competitions'
    ]
  },
  {
    id: 'american-parliamentary',
    title: 'American Parliamentary',
    description: 'Two-on-two format with a focus on rhetoric and persuasion.',
    icon: <Gavel size={24} />,
    category: 'academic',
    timeFormat: '7-minute constructives, 8-minute rebuttals',
    teamSize: '2 speakers per team',
    difficulty: 'Intermediate',
    origin: 'United States',
    keyFeatures: [
      'Government and Opposition teams',
      'Points of information allowed',
      'Emphasis on rhetoric and persuasion'
    ]
  },
  {
    id: 'mace',
    title: 'Mace Debate',
    description: 'Two teams of two speakers each, with an emphasis on clarity and persuasion.',
    icon: <Award size={24} />,
    category: 'competitive',
    timeFormat: '5-7 minutes per speech',
    teamSize: '2 speakers per team',
    difficulty: 'Intermediate',
    origin: 'United Kingdom',
    keyFeatures: [
      'Named after the Mace trophy',
      'Emphasis on persuasive speaking',
      'Popular in UK schools'
    ]
  },
  {
    id: 'world-schools',
    title: 'World Schools',
    description: 'Three-on-three format combining prepared and impromptu debates.',
    icon: <BookOpen size={24} />,
    category: 'competitive',
    timeFormat: '8-minute speeches, 4-minute replies',
    teamSize: '3 speakers per team',
    difficulty: 'Advanced',
    origin: 'Australia',
    keyFeatures: [
      'Mix of prepared and impromptu motions',
      'Reply speeches',
      'Used in World Schools Debating Championship'
    ]
  },
  {
    id: 'rapid-fire',
    title: 'Rapid Fire',
    description: 'Fast-paced format with short speeches and quick rebuttals.',
    icon: <Zap size={24} />,
    category: 'specialized',
    timeFormat: '2-3 minute speeches',
    teamSize: 'Varies',
    difficulty: 'Beginner',
    origin: 'Various',
    keyFeatures: [
      'Quick thinking under pressure',
      'Limited preparation time',
      'Great for practice and skill development'
    ]
  },
  {
    id: 'freestyle',
    title: 'Freestyle Debate',
    description: 'Flexible format with customizable rules to suit different contexts.',
    icon: <Sparkles size={24} />,
    category: 'specialized',
    timeFormat: 'Customizable',
    teamSize: 'Customizable',
    difficulty: 'Intermediate', // Changed from 'Varies' to fix type error
    origin: 'Various',
    keyFeatures: [
      'Adaptable rules',
      'Can incorporate elements from multiple formats',
      'Ideal for educational settings'
    ]
  },
  {
    id: 'one-minute-war',
    title: 'One Minute War',
    description: 'Ultra-rapid format where speakers have just one minute to make their case.',
    icon: <Clock size={24} />,
    category: 'specialized',
    timeFormat: '1 minute per speech',
    teamSize: 'Individual or teams',
    difficulty: 'Intermediate',
    origin: 'Modern debate innovation',
    keyFeatures: [
      'Extreme time pressure',
      'Forces concise argumentation',
      'Great for practicing efficiency'
    ]
  },
  {
    id: 'turncoat',
    title: 'Turncoat Debate',
    description: 'Speakers argue for one side, then switch to argue for the opposite side.',
    icon: <RefreshCw size={24} />,
    category: 'specialized',
    timeFormat: '4-5 minutes per side',
    teamSize: 'Individual',
    difficulty: 'Advanced',
    origin: 'Modern debate innovation',
    keyFeatures: [
      'Forces consideration of both sides',
      'Develops intellectual flexibility',
      'Challenges speakers to find strengths in opposing positions'
    ]
  },
  {
    id: 'devils-advocate',
    title: "Devil's Advocate",
    description: 'Debaters must argue against their personal beliefs or popular opinions.',
    icon: <Skull size={24} />,
    category: 'specialized',
    timeFormat: '5-7 minutes',
    teamSize: 'Individual or pairs',
    difficulty: 'Advanced',
    origin: 'Derived from theological practice',
    keyFeatures: [
      'Challenges personal biases',
      'Develops empathy for opposing viewpoints',
      'Strengthens ability to anticipate counterarguments'
    ]
  },
  {
    id: 'mock-trial',
    title: 'Mock Trial',
    description: 'Simulation of a court case with attorneys, witnesses, and judges.',
    icon: <Scroll size={24} />,
    category: 'specialized',
    timeFormat: 'Varies based on trial structure',
    teamSize: '6-8 per team',
    difficulty: 'Advanced',
    origin: 'Legal education',
    keyFeatures: [
      'Role-playing legal proceedings',
      'Evidence-based argumentation',
      'Follows court procedures and rules'
    ]
  }
];

const FormatsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<FormatCategory>('popular');
  const [currentRole, setCurrentRole] = useState<UserRole | null>('participant');

  const filteredFormats = formatDetails.filter(format => 
    selectedCategory === 'popular' ? true : format.category === selectedCategory
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentRole={currentRole} setCurrentRole={setCurrentRole} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-playfair text-navy mb-4">Debate Formats</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive collection of debate formats from around the world. 
              Each format offers unique challenges and opportunities to develop different debating skills.
            </p>
          </div>
          
          <Tabs defaultValue="popular" className="mb-12">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-slate-100">
                <TabsTrigger 
                  value="popular" 
                  onClick={() => setSelectedCategory('popular')}
                  className="data-[state=active]:bg-navy data-[state=active]:text-white"
                >
                  All Formats
                </TabsTrigger>
                <TabsTrigger 
                  value="academic" 
                  onClick={() => setSelectedCategory('academic')}
                  className="data-[state=active]:bg-navy data-[state=active]:text-white"
                >
                  Academic
                </TabsTrigger>
                <TabsTrigger 
                  value="competitive" 
                  onClick={() => setSelectedCategory('competitive')}
                  className="data-[state=active]:bg-navy data-[state=active]:text-white"
                >
                  Competitive
                </TabsTrigger>
                <TabsTrigger 
                  value="specialized" 
                  onClick={() => setSelectedCategory('specialized')}
                  className="data-[state=active]:bg-navy data-[state=active]:text-white"
                >
                  Specialized
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value={selectedCategory} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFormats.map((format) => (
                  <Card key={format.id} className="h-full hover:shadow-md transition-shadow border border-gray-200 overflow-hidden">
                    <CardHeader className="bg-slate-50 border-b border-gray-100 pb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-full bg-navy/10 text-navy">
                          {format.icon}
                        </div>
                        <CardTitle className="text-navy">{format.title}</CardTitle>
                      </div>
                      <CardDescription className="text-gray-600">
                        {format.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium text-navy">Time Format</p>
                            <p className="text-gray-600">{format.timeFormat}</p>
                          </div>
                          <div>
                            <p className="font-medium text-navy">Team Size</p>
                            <p className="text-gray-600">{format.teamSize}</p>
                          </div>
                          <div>
                            <p className="font-medium text-navy">Difficulty</p>
                            <p className="text-gray-600">{format.difficulty}</p>
                          </div>
                          <div>
                            <p className="font-medium text-navy">Origin</p>
                            <p className="text-gray-600">{format.origin}</p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="font-medium text-navy mb-2">Key Features</p>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {format.keyFeatures.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FormatsPage;
