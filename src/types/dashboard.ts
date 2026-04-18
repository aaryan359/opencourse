import type { UserStats } from './auth';

export interface UserUploadItem {
  _id: string;
  title: string;
  description?: string;
  url: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewNote?: string;
  createdAt: string;
  topic?: {
    _id?: string;
    title?: string;
  };
  course?: {
    _id?: string;
    title?: string;
    slug?: string;
  };
}

export interface PaginationMeta {
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

export interface UserUploadsResponse {
  data?: UserUploadItem[];
  meta?: PaginationMeta;
}

export interface UpdateProfilePayload {
  profile: {
    firstName?: string;
    lastName?: string;
    avatar?: string;
    bio?: string;
    title?: string;
    skills?: string[];
  };
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export type DashboardStats = UserStats;
