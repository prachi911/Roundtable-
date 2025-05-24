
export type UserRole = 'admin' | 'participant' | 'judge' | 'spectator';

export type DebateFormat = 
  | 'british' 
  | 'asian' 
  | 'lincoln-douglas'
  | 'public-forum'
  | 'karl-popper'
  | 'american-parliamentary'
  | 'mace'
  | 'world-schools'
  | 'rapid-fire'
  | 'freestyle'
  | 'one-minute-war'
  | 'turncoat'
  | 'devils-advocate'
  | 'mock-trial';

export type DebateRole = 
  | 'prime_minister' 
  | 'leader_opposition' 
  | 'deputy_prime' 
  | 'deputy_opposition'
  | 'member_government' 
  | 'member_opposition' 
  | 'government_whip'
  | 'opposition_whip'
  | 'affirmative' 
  | 'negative'
  | 'proposition_speaker_1'
  | 'proposition_speaker_2'
  | 'proposition_speaker_3'
  | 'opposition_speaker_1'
  | 'opposition_speaker_2'
  | 'opposition_speaker_3';

export type SpeechGoal = 'opening' | 'rebuttal' | 'summary' | 'cross_examination';

export interface MotionAnalysisRequest {
  motion: string;
  format: DebateFormat;
  role: DebateRole;
  goal: SpeechGoal;
}

export interface Argument {
  title: string;
  explanation: string;
  examples: string[];
}

export interface MotionAnalysis {
  keyTerms: string[];
  stakeholders: string[];
  forArguments: Argument[];
  againstArguments: Argument[];
  clashPoints: string[];
  fallacies: string[];
  rebuttals: {
    [key: string]: string;
  };
}

export interface Speech {
  introduction: string;
  constructiveArguments: Argument[];
  rebuttals: Argument[];
  conclusion: string;
}

export interface DebateEvent {
  id: string;
  title: string;
  format: DebateFormat;
  motion: string;
  date: string;
  participants: string[];
  judges: string[];
  rounds: number;
}

export interface ModuleInfo {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  comingSoon?: boolean;
}

export interface DebateFormatInfo {
  id: DebateFormat;
  title: string;
  description: string;
  teams: string;
  speakerTime: string;
  structure: string;
  idealFor: string;
}

