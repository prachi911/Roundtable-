
import { DebateEvent, MotionAnalysis, DebateFormatInfo } from '@/types';

export const recentMotions = [
  "This House believes that social media has done more harm than good to society",
  "This House would ban the use of animals in scientific research",
  "This House believes that universal basic income should be implemented",
  "This House supports mandatory voting in democratic elections",
  "This House would abolish the monarchy",
  "This House believes that artificial intelligence will be beneficial for humanity",
];

export const debateFormats: DebateFormatInfo[] = [
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
    title: 'Lincoln-Douglas',
    description: '1v1 format, multiple speech rounds, values-based resolutions',
    teams: '1 vs 1',
    speakerTime: '~6–7 mins + rebuttals',
    structure: 'Focus on morals/philosophy, individual critical thinking',
    idealFor: 'Solo debaters, high school'
  },
  {
    id: 'public-forum',
    title: 'Public Forum',
    description: 'Short, lay-friendly, crossfires between speeches',
    teams: '2 teams × 2 (4 debaters)',
    speakerTime: '~4 mins/speaker',
    structure: 'Short, lay-friendly, crossfires between speeches',
    idealFor: 'High school competitions'
  },
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
    id: 'rapid-fire',
    title: 'Rapid Fire (Custom)',
    description: 'Fast-paced, timed rebuttals',
    teams: 'Flexible (1–2 per team)',
    speakerTime: '~3 mins/speaker',
    structure: 'Fast-paced, timed rebuttals',
    idealFor: 'Quick games, casual practice'
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

export const debateEvents: DebateEvent[] = [
  {
    id: '1',
    title: 'International Debate Championship',
    format: 'british',
    motion: 'This House believes that social media has done more harm than good to society',
    date: '2025-06-15',
    participants: ['Team Alpha', 'Team Beta', 'Team Gamma', 'Team Delta'],
    judges: ['Judge A', 'Judge B', 'Judge C'],
    rounds: 4
  },
  {
    id: '2',
    title: 'Regional Debate Tournament',
    format: 'asian',
    motion: 'This House would ban the use of animals in scientific research',
    date: '2025-07-10',
    participants: ['Team Echo', 'Team Foxtrot', 'Team Golf', 'Team Hotel'],
    judges: ['Judge D', 'Judge E'],
    rounds: 3
  },
  {
    id: '3',
    title: 'University Debate Cup',
    format: 'lincoln-douglas',
    motion: 'This House believes that universal basic income should be implemented',
    date: '2025-08-05',
    participants: ['Team India', 'Team Juliet', 'Team Kilo', 'Team Lima'],
    judges: ['Judge F', 'Judge G', 'Judge H'],
    rounds: 5
  },
  {
    id: '4',
    title: 'High School Debate League',
    format: 'public-forum',
    motion: 'This House believes that standardized testing should be abolished in schools',
    date: '2025-06-25',
    participants: ['Team Mike', 'Team November', 'Team Oscar', 'Team Papa'],
    judges: ['Judge I', 'Judge J'],
    rounds: 3
  },
  {
    id: '5',
    title: 'European Debate Circuit',
    format: 'karl-popper',
    motion: 'This House believes that nuclear energy is essential for addressing climate change',
    date: '2025-07-20',
    participants: ['Team Quebec', 'Team Romeo', 'Team Sierra', 'Team Tango'],
    judges: ['Judge K', 'Judge L', 'Judge M'],
    rounds: 4
  },
  {
    id: '6',
    title: 'College Quick Debates',
    format: 'rapid-fire',
    motion: 'This House believes that social media platforms should be regulated as public utilities',
    date: '2025-06-10',
    participants: ['Team Uniform', 'Team Victor', 'Team Whiskey', 'Team X-ray'],
    judges: ['Judge N', 'Judge O'],
    rounds: 6
  }
];

export const sampleMotionAnalysis: MotionAnalysis = {
  keyTerms: [
    "Social Media", 
    "Harm", 
    "Good", 
    "Society"
  ],
  stakeholders: [
    "Users of social media", 
    "Technology companies", 
    "Governments", 
    "Traditional media outlets"
  ],
  forArguments: [
    {
      title: "Mental Health Impact",
      explanation: "Social media use has been correlated with increased rates of depression, anxiety, and negative body image, particularly among teenagers and young adults.",
      examples: [
        "Meta's own research showing Instagram's negative effects on teenage girls' mental health",
        "Studies linking social media use to decreased attention spans and sleep disturbances"
      ]
    },
    {
      title: "Spread of Misinformation",
      explanation: "Social media platforms facilitate the rapid spread of misinformation and fake news, leading to real-world consequences.",
      examples: [
        "COVID-19 vaccine misinformation campaigns",
        "Election interference through coordinated disinformation efforts"
      ]
    }
  ],
  againstArguments: [
    {
      title: "Global Connectivity",
      explanation: "Social media has connected people across vast distances and cultural divides, allowing for unprecedented global communication.",
      examples: [
        "Diaspora communities maintaining connections with home countries",
        "Cross-cultural exchange and understanding through direct communication"
      ]
    },
    {
      title: "Democratization of Information",
      explanation: "Social media has given voice to marginalized groups and allowed for rapid dissemination of important information outside traditional media channels.",
      examples: [
        "Arab Spring and role of social media in coordinating democratic movements",
        "Raising awareness about human rights violations in real-time"
      ]
    }
  ],
  clashPoints: [
    "Individual freedom vs. societal protection",
    "Corporate responsibility vs. user accountability",
    "Free speech vs. harmful content moderation"
  ],
  fallacies: [
    "False dichotomy: Assuming social media must be either entirely good or entirely bad",
    "Appeal to novelty: Assuming new technology is inherently better than what came before",
    "Post hoc: Attributing all societal changes since social media's rise directly to social media"
  ],
  rebuttals: {
    "Social media is just a tool, how people use it determines its impact": "While individual agency matters, platform design, algorithms, and business models actively shape behavior and incentivize engagement over well-being.",
    "People can simply disconnect if they find social media harmful": "This ignores network effects, professional necessities, and psychological addiction patterns that make 'just disconnecting' increasingly difficult."
  }
};

