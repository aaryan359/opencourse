export type UserRole = 'student' | 'contributor' | 'admin' | 'instructor' | 'super_admin';

export interface UserProfile {
  firstName?: string;
  lastName?: string;
  avatar?: string;
  bio?: string;
  title?: string;
  skills?: string[];
}

export interface UserStats {
  uploadedVideos?: number;
  totalVideosWatched?: number;
  totalWatchTime?: number;
  level?: number;
  xp?: number;
}

export interface AuthUser {
  _id: string;
  email: string;
  username: string;
  role: UserRole;
  contributorStatus?: 'none' | 'pending' | 'approved' | 'rejected';
  profile?: UserProfile;
  stats?: UserStats;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  profile?: UserProfile;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface AuthPayload {
  token: string;
  user: AuthUser;
}

export interface AdminUser {
  _id: string;
  email: string;
  username: string;
  role: UserRole;
}

export interface AdminAuthPayload {
  token: string;
  admin: AdminUser;
}
