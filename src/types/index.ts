/**
 * Frontend Global Types
 * Centralized type definitions for the entire frontend application
 * All types should be imported from this file for consistency
 */

/* ==================== AUTHENTICATION ==================== */

export interface AuthUser {
  _id: string;
  email: string;
  username: string;
  role: "student" | "instructor" | "admin" | "super_admin";
  profile: {
    firstName?: string;
    lastName?: string;
    avatar?: string;
    bio?: string;
    title?: string;
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  username: string;
  profile?: {
    firstName?: string;
    lastName?: string;
    avatar?: string;
    bio?: string;
    title?: string;
    skills?: string[];
  };
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

/* ==================== SKILLS & LEVELS ==================== */

export type SkillLevel = "beginner" | "intermediate" | "advanced";
export type Difficulty = "easy" | "medium" | "hard";
export type Status = "pending" | "approved" | "rejected" | "featured";
export type UserRole = "student" | "instructor" | "admin" | "super_admin";

/* ==================== CONTENT ENTITIES ==================== */

export interface Field {
  _id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Course {
  _id: string;
  title: string;
  slug: string;
  description: string;
  field: string | Field;
  level: SkillLevel;
  thumbnail?: string;
  courseCount?: number;
}

export interface Video {
  _id: string;
  title: string;
  description?: string;
  url: string;
  status: Status;
  uploadedBy?: { username?: string } | string;
  duration?: string;
  rating?: number;
  views?: number;
}

export interface Topic {
  _id: string;
  title: string;
  course: string;
  order: number;
  description?: string;
}

export interface MiniTopic {
  id: string;
  title: string;
  videos?: Video[];
  description?: string;
}

export interface Subtopic {
  id: string;
  title: string;
  miniTopics: MiniTopic[];
}

export interface DomainContent {
  tech: Topic[];
  nonTech: Topic[];
}

export interface Domain {
  slug: string;
  name: string;
  description: string;
  contributors: number;
  icon: string;
}

/* ==================== CONTRIBUTION TYPES ==================== */

export type ContributionType = "video" | "course" | "interview";

export interface ContributionData {
  topicId: string;
  title: string;
  description: string;
  tags: string[];
  level: SkillLevel;
  videoUrl?: string;
  videoFile?: File;
  externalLinks?: string[];
  notes?: string;
}

export interface UploadProgress {
  percentage: number;
  status: "idle" | "uploading" | "processing" | "complete" | "error";
  fileName?: string;
  error?: string;
}

export interface QuestionAnswer {
  id: string;
  question: string;
  answer: string;
  difficulty: Difficulty;
}

export interface InterviewSubmission {
  company: string;
  role: string;
  qaPairs: QuestionAnswer[];
  isAnonymous: boolean;
}

/* ==================== INTERVIEW PREP ==================== */

export interface InterviewQuestion {
  _id?: string;
  company: string;
  role: string;
  question: string;
  answer: string;
  difficulty: Difficulty;
  isAnonymous?: boolean;
  status?: Status;
}

export interface QAPair {
  question: string;
  answer: string;
  difficulty: Difficulty;
}

/* ==================== COMMUNITY ==================== */

export interface Creator {
  name: string;
  role: string;
  expertise: string[];
  followers: string;
  contributions: number;
  rank: number;
  verified: boolean;
  avatar?: string;
}

export interface Contributor {
  name: string;
  role: string;
  avatar?: string;
  contributions?: number;
}

export interface Discussion {
  title: string;
  author: string;
  tags: string[];
  replies: number;
  likes: number;
  views: number;
  time: string;
  trending?: boolean;
}

/* ==================== UI/COMPONENT TYPES ==================== */

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient?: string;
}

export interface Stat {
  icon: React.ComponentType<any>;
  label: string;
  value: string;
}

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface FilterOption {
  field: keyof Course;
  operator: "equals" | "contains" | "in";
  value: any;
}

export interface SortOption {
  field: keyof Course;
  direction: "asc" | "desc";
}

/* ==================== API RESPONSE TYPES ==================== */

export interface ApiResponse<T = any> {
  statusCode: number;
  message: string;
  data?: T;
  error?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    hasMore?: boolean;
  };
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

/* ==================== FORM TYPES ==================== */

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "textarea" | "select" | "checkbox";
  required?: boolean;
  placeholder?: string;
  options?: SelectOption[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: any) => boolean | string;
  };
}

export interface FormState {
  [key: string]: any;
}

export interface FormError {
  [key: string]: string;
}

/* ==================== DASHBOARD TYPES ==================== */

export interface UserStats {
  totalCourses: number;
  completedCourses: number;
  totalVideosWatched: number;
  totalWatchTime: number;
  uploadedVideos: number;
  level: number;
  xp: number;
}

export interface EnrollmentData {
  courseId: string;
  courseName: string;
  progress: number;
  startedAt: Date;
  completedAt?: Date;
  status: "active" | "completed" | "dropped";
}

/* ==================== SEARCH & FILTER ==================== */

export interface SearchQuery {
  keyword: string;
  filters?: {
    level?: SkillLevel[];
    field?: string[];
    status?: Status[];
  };
  sort?: {
    field: string;
    direction: "asc" | "desc";
  };
  pagination?: {
    page: number;
    limit: number;
  };
}

export interface SearchResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

/* ==================== ERROR HANDLING ==================== */

export interface ApiError {
  statusCode: number;
  message: string;
  details?: Record<string, any>;
  timestamp?: Date;
}

export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

/* ==================== ENROLLMENT ==================== */

export interface Enrollment {
  _id: string;
  user: string;
  course: string;
  status: "active" | "completed" | "dropped";
  progress: {
    completedVideos: string[];
    lastWatchedVideo?: string;
    completionPercentage: number;
    totalWatchTime: number;
  };
  enrolledAt: Date;
  completedAt?: Date;
}

/* ==================== MODAL & DIALOG ==================== */

export interface ModalState {
  isOpen: boolean;
  title?: string;
  content?: any;
  actions?: ModalAction[];
}

export interface ModalAction {
  label: string;
  onClick: () => void | Promise<void>;
  type?: "primary" | "secondary" | "danger";
  loading?: boolean;
}

/* ==================== TABLE/LIST ==================== */

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  width?: string;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface TableState {
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  page?: number;
  limit?: number;
  filters?: Record<string, any>;
}

/* ==================== NOTIFICATION ==================== */

export type NotificationType = "success" | "error" | "info" | "warning";

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  title?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/* ==================== MOTION/ANIMATION ==================== */

export interface AnimationVariants {
  hidden: any;
  visible: any;
  exit?: any;
}

export interface MotionConfig {
  ease: number[];
  duration: number;
  delay?: number;
}

/* ==================== UTILITY TYPES ==================== */

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type AsyncFunction<T = void> = () => Promise<T>;
export type VoidFunction = () => void;

export interface DebounceOptions {
  wait: number;
  leading?: boolean;
  trailing?: boolean;
}

export interface ThrottleOptions {
  wait: number;
  leading?: boolean;
  trailing?: boolean;
}

/* ==================== DEVICE & VIEWPORT ==================== */

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface ViewportSize {
  width: number;
  height: number;
  breakpoint: Breakpoint;
} 

export type DeviceType = "mobile" | "tablet" | "desktop";
