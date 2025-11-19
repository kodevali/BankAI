export enum PhaseStatus {
  Pending = 'Pending',
  Active = 'Active',
  Completed = 'Completed',
}

export interface Deliverable {
  name: string;
  completed: boolean;
}

export interface Activity {
  name: string;
  timeline: string;
  completed: boolean;
  dueDate?: string;
}

export interface ProjectPhase {
  id: number;
  name: string;
  focusArea: string;
  duration: string;
  keyActivities: Activity[];
  deliverables: string[];
  status: PhaseStatus;
  progress: number; // 0 to 100
}

export interface KPI {
  label: string;
  value: string;
  target: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export interface Participant {
  name: string;
  email: string;
  department: string;
  sessionDate: string;
  time: string;
}

export type ViewState = 'dashboard' | 'schedule' | 'brief' | 'assistant';