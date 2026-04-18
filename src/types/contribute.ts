export type ContributorApplicationStatus = 'pending' | 'approved' | 'rejected';

export interface ContributorApplication {
  _id: string;
  applicant: string;
  motivation: string;
  portfolioLinks?: string[];
  intendedTopics?: string[];
  status: ContributorApplicationStatus;
  reviewNote?: string;
  reviewedBy?: {
    _id?: string;
    username?: string;
    email?: string;
  } | string;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContributorApplicationPayload {
  motivation: string;
  portfolioLinks?: string[];
  intendedTopics?: string[];
}

export interface CreateTopicPayload {
  title: string;
  order?: number;
}

export interface UploadTopicContributionPayload {
  title: string;
  description?: string;
  url?: string;
  videoFile?: File;
  duration?: number;
  onUploadProgress?: (progressPercent: number) => void;
}
