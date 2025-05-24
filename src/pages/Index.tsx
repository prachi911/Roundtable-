import { useState } from 'react';
import { Gavel, MessageSquare, BookOpen, Activity, Users, Award, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserRole, DebateFormat, ModuleInfo } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RoleSelector from '@/components/RoleSelector';
import FormatSelector from '@/components/FormatSelector';
import ModuleCard from '@/components/ModuleCard';
import MotionCard from '@/components/MotionCard';
import ExploreTopics from '@/components/ExploreTopics';
import { recentMotions } from '@/data/mockData';

const Index = () => {
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<DebateFormat | null>(null);
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  
  const modules: ModuleInfo[] = [
    {
      id: 'motion-analysis',
      title: 'Motion Analysis & Argument Generator',
      description: 'Break down motions, get key arguments for and against, and develop rebuttals',
      icon: <MessageSquare className="h-6 w-6 text-navy" />,
      path: '/motion-analysis'
    },
    {
      id: 'speech-generator',
      title: 'Speech Generator',
      description: 'Create structured speeches with proper formatting for any debate role',
      icon: <BookOpen className="h-6 w-6 text-navy" />,
      path: '/speech-generator'
    },
    {
      id: 'research-assistant',
      title: 'Research Assistant',
      description: 'Find facts, statistics, quotes, and references for your arguments',
      icon: <Activity className="h-6 w-6 text-navy" />,
      path: '/research'
    },
    {
      id: 'practice-arena',
      title: 'Practice Arena',
      description: 'Practice timed speeches with feedback and analysis',
      icon: <Clock className="h-6 w-6 text-navy" />,
      path: '/practice'
    },
    {
      id: 'events',
      title: 'Debate Events',
      description: 'Create and manage debate events, matches, and tournaments',
      icon: <Users className="h-6 w-6 text-navy" />,
      path: '/events'
    },
    {
      id: 'judging',
      title: 'Judge Feedback',
      description: 'Provide structured feedback and scoring for debate rounds',
      icon: <Award className="h-6 w-6 text-navy" />,
      path: '/judging'
    },
  ];

  const handleRoleSelect = (role: UserRole) => {
    setCurrentRole(role);
    setShowRoleSelector(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentRole={currentRole} setCurrentRole={() => setShowRoleSelector(true)} />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-navy text-white py-16 md:py-24 px-4">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-playfair leading-tight">
                Elevate Your Debate Skills with <span className="text-gold">AI</span>
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
                Prepare, practice, and perfect your debate arguments with our comprehensive AI-powered platform.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-gold text-navy hover:bg-gold-dark">
                  Get Started
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white bg-navy-light hover:bg-navy hover:border-gold font-semibold">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Daily Topic and Quote of the Day */}
        <section className="py-8 px-4 bg-gold-light">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                <h3 className="text-xl font-semibold mb-2 text-navy font-playfair">Daily Topic</h3>
                <p className="text-gray-800 text-lg">"Should censorship exist?"</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                <h3 className="text-xl font-semibold mb-2 text-navy font-playfair">Quote of the Day</h3>
                <p className="text-gray-800 text-lg italic">"Disagreement is democracy."</p>
              </div>
            </div>
          </div>
        </section>

        {/* Role selector modal */}
        {showRoleSelector && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6 text-navy font-playfair">Select Your Role</h2>
              <RoleSelector selectedRole={currentRole} onSelectRole={handleRoleSelect} />
              <div className="flex justify-end mt-6">
                <Button variant="outline" className="mr-2" onClick={() => setShowRoleSelector(false)}>
                  Cancel
                </Button>
                <Button 
                  className="bg-navy hover:bg-navy-dark" 
                  disabled={!currentRole}
                  onClick={() => setShowRoleSelector(false)}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Intro section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy font-playfair">
                Your Complete Debate Companion
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Roundtable assists you at every stage of the debate cycle, from preparation to feedback.
                Select your role and get started with our specialized modules.
              </p>
            </div>
            
            {!currentRole ? (
              <div className="max-w-4xl mx-auto mb-16">
                <h3 className="text-xl font-semibold mb-6 text-navy font-playfair text-center">
                  Start by selecting your role:
                </h3>
                <RoleSelector selectedRole={currentRole} onSelectRole={handleRoleSelect} />
              </div>
            ) : (
              <div className="max-w-3xl mx-auto mb-16">
                <h3 className="text-xl font-semibold mb-4 text-navy font-playfair text-center">
                  Select a debate format:
                </h3>
                <FormatSelector selectedFormat={selectedFormat} onSelectFormat={setSelectedFormat} />
              </div>
            )}
          </div>
        </section>
        
        {/* Platform modules */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-navy font-playfair">
                Explore Our Modules
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                From motion analysis to judging feedback, our AI-powered tools help you excel in every aspect of debate.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {modules.map((module) => (
                <ModuleCard key={module.id} module={module} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Recent motions */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-navy font-playfair">
                Recent Debate Motions
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Explore recent debate motions and get started with motion analysis.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentMotions.map((motion, index) => (
                <MotionCard key={index} motion={motion} index={index} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Explore Topics on India */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <ExploreTopics />
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-16 px-4 bg-navy text-white">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4 font-playfair">Ready to Transform Your Debate Skills?</h2>
              <p className="text-lg opacity-90 mb-8">
                Join Roundtable today and take your arguments to the next level with our comprehensive AI-powered platform.
              </p>
              <Button size="lg" className="bg-gold text-navy hover:bg-gold-dark">
                Get Started Now
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
