export type InterviewDifficulty = 'easy' | 'medium' | 'hard';

export interface InterviewQAPair {
  question: string;
  answer: string;
  difficulty: InterviewDifficulty;
}

export interface SubmitInterviewPayload {
  company: string;
  role: string;
  qaPairs: InterviewQAPair[];
  isAnonymous?: boolean;
}

export interface InterviewSubmissionResult {
  id: string;
  company: string;
  role: string;
  qaPairsCount: number;
  status: 'pending' | 'approved' | 'rejected';
  isAnonymous: boolean;
}
