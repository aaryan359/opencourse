export type AdminContributionStatus = 'pending' | 'approved' | 'rejected';

export interface AdminVideoItem {
  _id: string;
  title: string;
  status: AdminContributionStatus;
  reviewNote?: string;
  uploadedBy?: { username?: string; email?: string } | string;
  course?: { title?: string };
  topic?: { title?: string };
  createdAt?: string;
}

export interface InterviewPair {
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface AdminInterviewItem {
  _id: string;
  company: string;
  role: string;
  status: AdminContributionStatus;
  isAnonymous: boolean;
  submittedBy?: { username?: string; email?: string } | string;
  qaPairs: InterviewPair[];
  createdAt?: string;
}
