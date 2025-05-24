import React from 'react';
import { Gavel, Award, Users, BookOpen, MessageSquare, Lightbulb, Globe } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const About = () => {
  const teamMembers = [
    {
      name: 'Prachi Bhatarkar',
      role: 'Founder & Lead Developer',
      bio: 'Passionate about debate and technology, Prachi created Roundtable to make debate resources accessible to everyone.',
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      name: 'Aditya Sharma',
      role: 'Debate Coach & Content Strategist',
      bio: 'Former national debate champion with 10+ years of coaching experience, guiding the platform\'s educational content.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      name: 'Neha Patel',
      role: 'UX Designer',
      bio: 'Specializes in creating intuitive user experiences that make complex debate concepts accessible to all skill levels.',
      image: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    {
      name: 'Rahul Mehta',
      role: 'AI Research Lead',
      bio: 'PhD in computational linguistics, leading the development of Roundtable\'s AI-powered debate assistance features.',
      image: 'https://randomuser.me/api/portraits/men/76.jpg'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentRole={null} setCurrentRole={() => {}} />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-navy text-white py-16 md:py-20 px-4">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair leading-tight">
                About <span className="text-gold">Roundtable</span>
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
                Empowering debaters with AI-powered tools and resources to elevate their skills and arguments.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Mission */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-navy font-playfair">Our Mission</h2>
                <Separator className="mx-auto w-24 bg-gold h-1 mb-6" />
                <p className="text-lg text-gray-700 leading-relaxed">
                  At Roundtable, we believe that the art of debate is fundamental to a healthy democracy and critical thinking. 
                  Our mission is to democratize access to high-quality debate resources, making them available to everyone 
                  regardless of background or experience level.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mt-4">
                  Through our AI-powered platform, we aim to help individuals develop their argumentation skills, 
                  engage with complex topics, and foster a culture of respectful discourse in an increasingly polarized world.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="bg-navy/5 rounded-full p-4 inline-flex mb-4">
                    <Lightbulb className="h-8 w-8 text-navy" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-navy">Educate</h3>
                  <p className="text-gray-600">
                    Provide accessible learning resources for debaters of all skill levels, from beginners to experts.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-navy/5 rounded-full p-4 inline-flex mb-4">
                    <Users className="h-8 w-8 text-navy" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-navy">Connect</h3>
                  <p className="text-gray-600">
                    Build a global community of debaters who can learn from each other and grow together.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-navy/5 rounded-full p-4 inline-flex mb-4">
                    <Award className="h-8 w-8 text-navy" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-navy">Elevate</h3>
                  <p className="text-gray-600">
                    Help debaters reach their full potential through AI-powered tools and personalized feedback.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-navy font-playfair">Our Story</h2>
                <Separator className="mx-auto w-24 bg-gold h-1 mb-6" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="relative">
                    <div className="absolute -top-4 -left-4 w-24 h-24 bg-gold/20 rounded-tl-3xl"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
                      alt="Debate team" 
                      className="rounded-lg shadow-lg relative z-10 w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Roundtable was born out of a passion for debate and a recognition of the challenges faced by debaters worldwide. 
                    Our founder, a former debate champion, experienced firsthand the disparities in access to quality coaching and resources.
                  </p>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    In 2023, we set out to create a platform that would leverage the power of artificial intelligence to provide 
                    personalized debate assistance, making high-quality coaching accessible to everyone.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Today, Roundtable serves thousands of debaters across the globe, from high school students participating in their 
                    first tournament to seasoned professionals honing their skills. Our community continues to grow as we expand our 
                    features and resources.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Team */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-navy font-playfair">Meet Our Team</h2>
                <Separator className="mx-auto w-24 bg-gold h-1 mb-6" />
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Our diverse team brings together expertise in debate, education, technology, and design to create 
                  the most comprehensive debate platform available.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <Card key={index} className="overflow-hidden border-none shadow-md">
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="text-xl font-semibold text-navy">{member.name}</h3>
                      <p className="text-gold font-medium text-sm mb-2">{member.role}</p>
                      <p className="text-gray-600 text-sm">{member.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16 px-4 bg-navy text-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 font-playfair">Our Values</h2>
                <Separator className="mx-auto w-24 bg-gold h-1 mb-6" />
                <p className="text-lg opacity-90 max-w-3xl mx-auto">
                  These core principles guide everything we do at Roundtable, from feature development to community engagement.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-navy-light p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="bg-gold/20 rounded-full p-2 mt-1">
                      <MessageSquare className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Intellectual Honesty</h3>
                      <p className="text-white/80">
                        We believe in the pursuit of truth through rigorous reasoning and evidence-based arguments, 
                        even when it challenges our own perspectives.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-navy-light p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="bg-gold/20 rounded-full p-2 mt-1">
                      <Globe className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Inclusivity</h3>
                      <p className="text-white/80">
                        We're committed to making debate accessible to everyone, regardless of background, 
                        geography, or prior experience.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-navy-light p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="bg-gold/20 rounded-full p-2 mt-1">
                      <BookOpen className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Continuous Learning</h3>
                      <p className="text-white/80">
                        We embrace a growth mindset, constantly improving our platform and encouraging 
                        lifelong learning in our community.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-navy-light p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="bg-gold/20 rounded-full p-2 mt-1">
                      <Gavel className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Respectful Discourse</h3>
                      <p className="text-white/80">
                        We foster an environment where diverse viewpoints are respected and engaged with 
                        constructively, not dismissed or ridiculed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-16 px-4 bg-gold-light">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4 text-navy font-playfair">Join Our Community</h2>
              <p className="text-lg text-gray-700 mb-8">
                Become part of the Roundtable community today and take your debate skills to the next level with our comprehensive platform.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-navy text-white hover:bg-navy-dark">
                  Get Started
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-navy text-navy hover:bg-navy hover:text-white">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
