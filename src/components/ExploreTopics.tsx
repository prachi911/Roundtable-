import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Flag, Building, Users, Lightbulb, Landmark } from 'lucide-react';

interface TopicCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const ExploreTopics = () => {
  const indiaTopics: TopicCardProps[] = [
    {
      title: "India's Federal Structure",
      description: "Explore the balance of power between central and state governments, and the challenges of cooperative federalism in India.",
      icon: <Landmark className="h-8 w-8 text-navy" />,
      category: "Governance",
      difficulty: "Intermediate"
    },
    {
      title: "Economic Reforms and Liberalization",
      description: "Discuss the impact of the 1991 economic reforms and ongoing liberalization policies on India's development.",
      icon: <TrendingUp className="h-8 w-8 text-navy" />,
      category: "Economy",
      difficulty: "Advanced"
    },
    {
      title: "Cultural Diversity and National Identity",
      description: "Debate the relationship between India's diverse cultural traditions and the formation of a unified national identity.",
      icon: <Flag className="h-8 w-8 text-navy" />,
      category: "Society",
      difficulty: "Beginner"
    },
    {
      title: "Urban Development Challenges",
      description: "Analyze the challenges of rapid urbanization, smart cities initiatives, and sustainable urban planning in India.",
      icon: <Building className="h-8 w-8 text-navy" />,
      category: "Development",
      difficulty: "Intermediate"
    },
    {
      title: "Education Reform and Policy",
      description: "Examine the National Education Policy and debates around education reform, access, and quality in India.",
      icon: <Lightbulb className="h-8 w-8 text-navy" />,
      category: "Education",
      difficulty: "Intermediate"
    },
    {
      title: "Social Justice and Affirmative Action",
      description: "Discuss reservation policies, social justice mechanisms, and their impact on equality and opportunity in India.",
      icon: <Users className="h-8 w-8 text-navy" />,
      category: "Society",
      difficulty: "Advanced"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'Advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-navy font-playfair">
          Explore Topics on India
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Dive into these important topics related to India's governance, economy, society, and development for your next debate.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {indiaTopics.map((topic, index) => (
          <Card key={index} className="border border-gray-200 hover:shadow-md transition-all overflow-hidden h-full flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="p-2 rounded-lg bg-navy/5 mb-3">
                  {topic.icon}
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded ${getDifficultyColor(topic.difficulty)}`}>
                  {topic.difficulty}
                </span>
              </div>
              <CardTitle className="text-xl text-navy">{topic.title}</CardTitle>
              <span className="text-sm text-gray-500">{topic.category}</span>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-gray-700">
                {topic.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="pt-2 pb-4">
              <Button variant="outline" className="w-full border-navy text-navy hover:bg-navy hover:text-white">
                <span>Explore Topic</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-10 text-center">
        <Button className="bg-navy hover:bg-navy-dark">
          View All India Topics
        </Button>
      </div>
    </div>
  );
};

export default ExploreTopics;
