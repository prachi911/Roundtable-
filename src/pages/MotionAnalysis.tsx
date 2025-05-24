
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserRole, DebateFormat, DebateRole, SpeechGoal, MotionAnalysis } from '@/types';
import { sampleMotionAnalysis } from '@/data/mockData';
import { Check, ChevronRight, Search, ArrowRight, Flag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MotionAnalysisPage = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const motionFromUrl = searchParams.get('motion');
  
  const [currentRole, setCurrentRole] = useState<UserRole | null>('participant');
  const [motion, setMotion] = useState(motionFromUrl || '');
  const [selectedFormat, setSelectedFormat] = useState<DebateFormat>('british');
  const [selectedRole, setSelectedRole] = useState<DebateRole>('prime_minister');
  const [selectedGoal, setSelectedGoal] = useState<SpeechGoal>('opening');
  const [analysis, setAnalysis] = useState<MotionAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGeneratingSpeech, setIsGeneratingSpeech] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAnalyzeMotion = () => {
    if (!motion.trim()) {
      toast({
        title: "Motion Required",
        description: "Please enter a debate motion to analyze.",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setAnalysis(sampleMotionAnalysis);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: "Your motion has been analyzed successfully.",
      });
    }, 1500);
  };

  const handleGenerateFullSpeech = () => {
    if (!analysis) {
      toast({
        title: "Analysis Required",
        description: "Please analyze a motion first before generating a speech.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGeneratingSpeech(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsGeneratingSpeech(false);
      
      toast({
        title: "Speech Generated",
        description: "Your full speech has been generated successfully.",
      });
      
      // Navigate to the speech generator page with the motion and analysis data
      navigate(`/speech-generator?motion=${encodeURIComponent(motion)}&format=${selectedFormat}&role=${selectedRole}`);
    }, 1500);
  };

  const roleOptions: { value: DebateRole; label: string; format: DebateFormat | 'all' }[] = [
    // British Parliamentary roles
    { value: 'prime_minister', label: 'Prime Minister', format: 'british' },
    { value: 'leader_opposition', label: 'Leader of Opposition', format: 'british' },
    { value: 'deputy_prime', label: 'Deputy Prime Minister', format: 'british' },
    { value: 'deputy_opposition', label: 'Deputy Leader of Opposition', format: 'british' },
    { value: 'member_government', label: 'Member of Government', format: 'british' },
    { value: 'member_opposition', label: 'Member of Opposition', format: 'british' },
    { value: 'government_whip', label: 'Government Whip', format: 'british' },
    { value: 'opposition_whip', label: 'Opposition Whip', format: 'british' },
    
    // Asian Parliamentary and Lincoln-Douglas roles
    { value: 'affirmative', label: 'Affirmative', format: 'lincoln-douglas' },
    { value: 'negative', label: 'Negative', format: 'lincoln-douglas' },
  ];

  const filteredRoles = roleOptions.filter(
    role => role.format === selectedFormat || role.format === 'all'
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentRole={currentRole} setCurrentRole={setCurrentRole} />
      
      <main className="flex-grow">
        {/* Page header */}
        <section className="bg-navy text-white py-12 px-4">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
                Motion Analysis & Argument Generator
              </h1>
              <p className="text-lg opacity-90 leading-relaxed">
                Break down debate motions, get key arguments for and against, and develop powerful rebuttals.
              </p>
            </div>
          </div>
        </section>
        
        {/* Motion input section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-bold mb-6 text-navy font-playfair">Enter Motion Details</h2>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="motion" className="text-navy font-medium">Debate Motion</Label>
                  <Textarea
                    id="motion"
                    placeholder="This House believes that..."
                    value={motion}
                    onChange={(e) => setMotion(e.target.value)}
                    className="mt-1 h-24"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="format" className="text-navy font-medium">Debate Format</Label>
                    <Select 
                      value={selectedFormat} 
                      onValueChange={(value: DebateFormat) => {
                        setSelectedFormat(value);
                        // Reset role when format changes
                        setSelectedRole(
                          value === 'british' ? 'prime_minister' : 
                          value === 'lincoln-douglas' ? 'affirmative' : 'prime_minister'
                        );
                      }}
                    >
                      <SelectTrigger id="format" className="mt-1">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="british">British Parliamentary</SelectItem>
                        <SelectItem value="asian">Asian Parliamentary</SelectItem>
                        <SelectItem value="lincoln-douglas">Lincoln-Douglas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="role" className="text-navy font-medium">Your Role</Label>
                    <Select value={selectedRole} onValueChange={(value: DebateRole) => setSelectedRole(value)}>
                      <SelectTrigger id="role" className="mt-1">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredRoles.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="goal" className="text-navy font-medium">Speech Goal</Label>
                  <Select value={selectedGoal} onValueChange={(value: SpeechGoal) => setSelectedGoal(value)}>
                    <SelectTrigger id="goal" className="mt-1">
                      <SelectValue placeholder="Select goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="opening">Opening Speech</SelectItem>
                      <SelectItem value="rebuttal">Rebuttal</SelectItem>
                      <SelectItem value="summary">Summary Speech</SelectItem>
                      <SelectItem value="cross_examination">Cross-Examination</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  className="w-full bg-navy hover:bg-navy-dark"
                  onClick={handleAnalyzeMotion}
                  disabled={isAnalyzing || !motion.trim()}
                >
                  {isAnalyzing ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      <span>Analyzing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Search className="mr-2 h-4 w-4" />
                      <span>Analyze Motion</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Analysis results section */}
        {analysis && (
          <section className="py-12 px-4 bg-gray-50">
            <div className="container mx-auto">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-8 text-navy font-playfair text-center">Analysis Results</h2>
                
                {/* Motion breakdown */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="text-xl text-navy">Motion Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium text-navy mb-2">Key Terms</h3>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700">
                          {analysis.keyTerms.map((term, index) => (
                            <li key={index}>{term}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium text-navy mb-2">Stakeholders</h3>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700">
                          {analysis.stakeholders.map((stakeholder, index) => (
                            <li key={index}>{stakeholder}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-medium text-navy mb-2">Potential Clash Points</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        {analysis.clashPoints.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Arguments tabs */}
                <Tabs defaultValue="for" className="mb-8">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="for">
                      <span className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        For the Motion
                      </span>
                    </TabsTrigger>
                    <TabsTrigger value="against">
                      <span className="flex items-center">
                        <Flag className="mr-2 h-4 w-4 text-red-500" />
                        Against the Motion
                      </span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="for" className="mt-4">
                    <Card>
                      <CardContent className="pt-6">
                        <Accordion type="single" collapsible className="w-full">
                          {analysis.forArguments.map((arg, index) => (
                            <AccordionItem key={index} value={`for-item-${index}`}>
                              <AccordionTrigger className="text-navy font-medium">
                                {arg.title}
                              </AccordionTrigger>
                              <AccordionContent className="text-gray-700">
                                <p className="mb-3">{arg.explanation}</p>
                                <div className="pl-4 border-l-2 border-navy/20">
                                  <h4 className="text-sm font-semibold text-navy mb-1">Supporting Examples:</h4>
                                  <ul className="list-disc pl-5 space-y-1">
                                    {arg.examples.map((example, exIndex) => (
                                      <li key={exIndex}>{example}</li>
                                    ))}
                                  </ul>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="against" className="mt-4">
                    <Card>
                      <CardContent className="pt-6">
                        <Accordion type="single" collapsible className="w-full">
                          {analysis.againstArguments.map((arg, index) => (
                            <AccordionItem key={index} value={`against-item-${index}`}>
                              <AccordionTrigger className="text-navy font-medium">
                                {arg.title}
                              </AccordionTrigger>
                              <AccordionContent className="text-gray-700">
                                <p className="mb-3">{arg.explanation}</p>
                                <div className="pl-4 border-l-2 border-navy/20">
                                  <h4 className="text-sm font-semibold text-navy mb-1">Supporting Examples:</h4>
                                  <ul className="list-disc pl-5 space-y-1">
                                    {arg.examples.map((example, exIndex) => (
                                      <li key={exIndex}>{example}</li>
                                    ))}
                                  </ul>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
                
                {/* Rebuttals section */}
                <Card className="mb-8">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl text-navy">Common Counterarguments & Rebuttals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(analysis.rebuttals).map(([counterarg, rebuttal], index) => (
                        <div key={index} className="border-b border-gray-200 pb-4 last:border-none last:pb-0">
                          <div className="flex items-start">
                            <div className="bg-gray-200 text-navy rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                              <ChevronRight className="h-4 w-4" />
                            </div>
                            <div className="ml-3">
                              <p className="font-medium text-navy">{counterarg}</p>
                              <p className="mt-1 text-gray-700">{rebuttal}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Fallacies section */}
                <Card className="mb-8">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl text-navy">Potential Fallacies to Watch For</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.fallacies.map((fallacy, index) => (
                        <li key={index} className="flex items-start">
                          <div className="bg-red-100 text-red-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold">{index + 1}</span>
                          </div>
                          <p className="ml-3 text-gray-700">{fallacy}</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <div className="flex justify-center">
                  <Button 
                    className="bg-navy hover:bg-navy-dark" 
                    onClick={handleGenerateFullSpeech}
                    disabled={isGeneratingSpeech || !analysis}
                  >
                    {isGeneratingSpeech ? (
                      <>
                        <span>Generating...</span>
                        <div className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      </>
                    ) : (
                      <>
                        <span>Generate Full Speech</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default MotionAnalysisPage;
