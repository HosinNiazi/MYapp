
export enum AppSection {
  DASHBOARD = 'dashboard',
  DANA = 'dana',
  PARVANEH = 'parvaneh',
  SUMMARIZER = 'summarizer',
  PLANNER = 'planner',
  TOOLS = 'tools',
  VIRTUAL_CLASS = 'virtual-class',
  AI_ASSISTANT = 'ai-assistant',
  PROFILE = 'profile'
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export interface Task {
  id: string;
  title: string;
  isDone: boolean;
  time: string;
}

export interface UserProfile {
  name: string;
  university: string;
  major: string;
  semester: string;
  level: number;
  exp: number;
}

export interface StudyRoom {
  id: string;
  name: string;
  members: number;
  isActive: boolean;
}
