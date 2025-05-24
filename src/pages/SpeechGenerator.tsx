
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserRole, DebateFormat, DebateRole, SpeechGoal, Speech } from '@/types';
import { FileText, Download, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SpeechGeneratorPage = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const motionFromUrl = searchParams.get('motion');
  const formatFromUrl = searchParams.get('format') as DebateFormat;
  const roleFromUrl = searchParams.get('role') as DebateRole;
  
  const [currentRole, setCurrentRole] = useState<UserRole | null>('participant');
  const [motion, setMotion] = useState(motionFromUrl || '');
  const [selectedFormat, setSelectedFormat] = useState<DebateFormat>(formatFromUrl || 'british');
  const [selectedRole, setSelectedRole] = useState<DebateRole>(roleFromUrl || 'prime_minister');
  const [selectedGoal, setSelectedGoal] = useState<SpeechGoal>('opening');
  
  // If we have parameters from the URL, automatically generate a speech
  // Define auto-generation effect after the handleGenerateSpeech function is defined
  const [shouldAutoGenerate, setShouldAutoGenerate] = useState<boolean>(Boolean(motionFromUrl && formatFromUrl && roleFromUrl));

  const [speechLength, setSpeechLength] = useState('7');
  const [keyPoints, setKeyPoints] = useState('');
  const [speech, setSpeech] = useState<Speech | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateSpeech = () => {
    if (!motion.trim()) {
      toast({
        title: "Motion Required",
        description: "Please enter a debate motion to generate a speech.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const generatedSpeech: Speech = {
        introduction: `Honorable Chair, distinguished judges, and worthy opponents. Today we stand before you to argue that ${motion.toLowerCase()}. This motion strikes at the heart of a fundamental issue that affects millions of people worldwide. Through careful analysis and compelling evidence, we will demonstrate why this proposition is not only necessary but morally imperative.`,
        constructiveArguments: [
          {
            title: "Economic Benefits",
            explanation: "The economic advantages of this motion are substantial and far-reaching. Implementation would create new opportunities for growth, innovation, and prosperity across multiple sectors.",
            examples: [
              "Increased GDP growth by an estimated 2-3% annually",
              "Creation of 50,000+ new jobs in the first year",
              "Attraction of foreign investment worth $5 billion"
            ]
          },
          {
            title: "Social Justice and Equality",
            explanation: "This motion represents a crucial step toward a more equitable society. By addressing systemic inequalities, we can create a fairer world for all citizens.",
            examples: [
              "Reduction in income inequality by 15%",
              "Improved access to essential services for marginalized communities",
              "Enhanced representation in decision-making processes"
            ]
          },
          {
            title: "Environmental Sustainability",
            explanation: "The environmental implications of this motion align with global sustainability goals and our responsibility to future generations.",
            examples: [
              "30% reduction in carbon emissions within 5 years",
              "Protection of 100,000 hectares of critical habitat",
              "Innovation in clean technology sectors"
            ]
          }
        ],
        rebuttals: [
          {
            title: "Addressing Implementation Concerns",
            explanation: "While opponents may argue that implementation would be costly and complex, the long-term benefits far outweigh short-term challenges.",
            examples: [
              "Similar policies have succeeded in comparable contexts",
              "Phased implementation reduces transition costs",
              "Strong institutional support ensures effective execution"
            ]
          }
        ],
        conclusion: "In conclusion, honorable Chair, we have demonstrated that this motion represents not just a policy choice, but a moral imperative. The economic benefits, social justice implications, and environmental advantages create a compelling case for immediate action. We urge you to support this motion and help us build a better future for all. Thank you."
      };
      
      setSpeech(generatedSpeech);
      setIsGenerating(false);
      
      toast({
        title: "Speech Generated",
        description: "Your debate speech has been generated successfully.",
      });
    }, 2000);
  };

  // Auto-generate speech if we have URL parameters
  useEffect(() => {
    if (shouldAutoGenerate) {
      // Use a small timeout to ensure the component is fully mounted
      const timer = setTimeout(() => {
        handleGenerateSpeech();
        setShouldAutoGenerate(false); // Prevent multiple generations
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [shouldAutoGenerate]);

  const handleCopyToClipboard = async (text: string, section: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000);
      toast({
        title: "Copied to Clipboard",
        description: `${section} has been copied to your clipboard.`,
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy text to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadSpeech = () => {
    if (!speech) return;
    
    const fullSpeech = `
DEBATE SPEECH
Motion: ${motion}
Format: ${selectedFormat}
Role: ${selectedRole}
Goal: ${selectedGoal}
Length: ${speechLength} minutes

INTRODUCTION
${speech.introduction}

CONSTRUCTIVE ARGUMENTS
${speech.constructiveArguments.map((arg, index) => `
${index + 1}. ${arg.title}
${arg.explanation}

Supporting Evidence:
${arg.examples.map(example => `• ${example}`).join('\n')}
`).join('\n')}

REBUTTALS
${speech.rebuttals.map((rebuttal, index) => `
${index + 1}. ${rebuttal.title}
${rebuttal.explanation}

Supporting Evidence:
${rebuttal.examples.map(example => `• ${example}`).join('\n')}
`).join('\n')}

CONCLUSION
${speech.conclusion}
    `;
    
    const blob = new Blob([fullSpeech], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `debate-speech-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
                AI Speech Generator
              </h1>
              <p className="text-lg opacity-90 leading-relaxed">
                Generate structured, compelling debate speeches tailored to your role and format.
              </p>
            </div>
          </div>
        </section>
        
        {/* Speech input section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-bold mb-6 text-navy font-playfair">Speech Configuration</h2>
              
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  
                  <div>
                    <Label htmlFor="length" className="text-navy font-medium">Speech Length (minutes)</Label>
                    <Input
                      id="length"
                      type="number"
                      min="1"
                      max="20"
                      value={speechLength}
                      onChange={(e) => setSpeechLength(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="keyPoints" className="text-navy font-medium">Key Points (Optional)</Label>
                  <Textarea
                    id="keyPoints"
                    placeholder="Enter specific points you want to include in your speech..."
                    value={keyPoints}
                    onChange={(e) => setKeyPoints(e.target.value)}
                    className="mt-1 h-20"
                  />
                </div>
                
                <Button 
                  className="w-full bg-navy hover:bg-navy-dark"
                  onClick={handleGenerateSpeech}
                  disabled={isGenerating || !motion.trim()}
                >
                  {isGenerating ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      <span>Generating Speech...</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Generate Speech</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Generated speech section */}
        {speech && (
          <section className="py-12 px-4 bg-gray-50">
            <div className="container mx-auto">
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-navy font-playfair">Generated Speech</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleDownloadSpeech}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
                
                <Tabs defaultValue="structured" className="mb-8">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="structured">Structured View</TabsTrigger>
                    <TabsTrigger value="full">Full Speech</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="structured" className="mt-4">
                    <div className="space-y-6">
                      {/* Introduction */}
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                          <CardTitle className="text-lg text-navy">Introduction</CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyToClipboard(speech.introduction, 'Introduction')}
                          >
                            {copiedSection === 'Introduction' ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 leading-relaxed">{speech.introduction}</p>
                        </CardContent>
                      </Card>
                      
                      {/* Constructive Arguments */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg text-navy">Constructive Arguments</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {speech.constructiveArguments.map((arg, index) => (
                              <div key={index} className="border-b border-gray-200 pb-4 last:border-none last:pb-0">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-medium text-navy">{arg.title}</h4>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleCopyToClipboard(
                                      `${arg.title}\n\n${arg.explanation}\n\nSupporting Evidence:\n${arg.examples.map(ex => `• ${ex}`).join('\n')}`,
                                      `Argument ${index + 1}`
                                    )}
                                  >
                                    {copiedSection === `Argument ${index + 1}` ? (
                                      <Check className="h-4 w-4 text-green-600" />
                                    ) : (
                                      <Copy className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                                <p className="text-gray-700 mb-3">{arg.explanation}</p>
                                <div className="pl-4 border-l-2 border-navy/20">
                                  <h5 className="text-sm font-semibold text-navy mb-1">Supporting Evidence:</h5>
                                  <ul className="list-disc pl-5 space-y-1">
                                    {arg.examples.map((example, exIndex) => (
                                      <li key={exIndex} className="text-gray-700">{example}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* Rebuttals */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg text-navy">Rebuttals</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {speech.rebuttals.map((rebuttal, index) => (
                              <div key={index} className="border-b border-gray-200 pb-4 last:border-none last:pb-0">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-medium text-navy">{rebuttal.title}</h4>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleCopyToClipboard(
                                      `${rebuttal.title}\n\n${rebuttal.explanation}\n\nSupporting Evidence:\n${rebuttal.examples.map(ex => `• ${ex}`).join('\n')}`,
                                      `Rebuttal ${index + 1}`
                                    )}
                                  >
                                    {copiedSection === `Rebuttal ${index + 1}` ? (
                                      <Check className="h-4 w-4 text-green-600" />
                                    ) : (
                                      <Copy className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                                <p className="text-gray-700 mb-3">{rebuttal.explanation}</p>
                                <div className="pl-4 border-l-2 border-navy/20">
                                  <h5 className="text-sm font-semibold text-navy mb-1">Supporting Evidence:</h5>
                                  <ul className="list-disc pl-5 space-y-1">
                                    {rebuttal.examples.map((example, exIndex) => (
                                      <li key={exIndex} className="text-gray-700">{example}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* Conclusion */}
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                          <CardTitle className="text-lg text-navy">Conclusion</CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyToClipboard(speech.conclusion, 'Conclusion')}
                          >
                            {copiedSection === 'Conclusion' ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 leading-relaxed">{speech.conclusion}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="full" className="mt-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg text-navy">Complete Speech</CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const fullText = `${speech.introduction}\n\n${speech.constructiveArguments.map(arg => 
                              `${arg.title}\n${arg.explanation}\n\nSupporting Evidence:\n${arg.examples.map(ex => `• ${ex}`).join('\n')}`
                            ).join('\n\n')}\n\n${speech.rebuttals.map(rebuttal => 
                              `${rebuttal.title}\n${rebuttal.explanation}\n\nSupporting Evidence:\n${rebuttal.examples.map(ex => `• ${ex}`).join('\n')}`
                            ).join('\n\n')}\n\n${speech.conclusion}`;
                            handleCopyToClipboard(fullText, 'Full Speech');
                          }}
                        >
                          {copiedSection === 'Full Speech' ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="prose max-w-none">
                          <div className="space-y-6 text-gray-700">
                            <div>
                              <h3 className="text-lg font-medium text-navy mb-2">Introduction</h3>
                              <p className="leading-relaxed">{speech.introduction}</p>
                            </div>
                            
                            <div>
                              <h3 className="text-lg font-medium text-navy mb-2">Main Arguments</h3>
                              {speech.constructiveArguments.map((arg, index) => (
                                <div key={index} className="mb-4">
                                  <h4 className="font-medium text-navy mb-1">{arg.title}</h4>
                                  <p className="mb-2 leading-relaxed">{arg.explanation}</p>
                                  <p className="text-sm text-gray-600">
                                    Supporting evidence: {arg.examples.join('; ')}
                                  </p>
                                </div>
                              ))}
                            </div>
                            
                            <div>
                              <h3 className="text-lg font-medium text-navy mb-2">Rebuttals</h3>
                              {speech.rebuttals.map((rebuttal, index) => (
                                <div key={index} className="mb-4">
                                  <h4 className="font-medium text-navy mb-1">{rebuttal.title}</h4>
                                  <p className="mb-2 leading-relaxed">{rebuttal.explanation}</p>
                                  <p className="text-sm text-gray-600">
                                    Supporting evidence: {rebuttal.examples.join('; ')}
                                  </p>
                                </div>
                              ))}
                            </div>
                            
                            <div>
                              <h3 className="text-lg font-medium text-navy mb-2">Conclusion</h3>
                              <p className="leading-relaxed">{speech.conclusion}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default SpeechGeneratorPage;
