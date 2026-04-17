/**
 * Backend Global Types
 * Centralized type definitions for the entire backend application
 * All types should be imported from this file for consistency
 */

import type { Document, Types } from 'mongoose';

/* ==================== SHARED TYPES ==================== */

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type Status = 'pending' | 'approved' | 'rejected' | 'featured';
export type UserRole = 'student' | 'instructor' | 'admin' | 'super_admin';
export type EnrollmentStatus = 'active' | 'completed' | 'dropped';

/* ==================== USER TYPES ==================== */

export interface IUserProfile {
    firstName?: string;
    lastName?: string;
    avatar?: string;
    bio?: string;
    title?: string;
    skills?: string[];
}

export interface IUserStats {
    totalCourses: number;
    completedCourses: number;
    totalVideosWatched: number;
    totalWatchTime: number;
    uploadedVideos: number;
    level: number;
    xp: number;
}

export interface IUser extends Document {
    email: string;
    password: string;
    username: string;
    profile: IUserProfile;
    stats: IUserStats;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidate: string): Promise<boolean>;
}

/* ==================== FIELD TYPES ==================== */

export interface IField extends Document {
    name: string;
    slug: string;
    description?: string;
    courseCount?: number;
    createdAt: Date;
    updatedAt: Date;
}

/* ==================== COURSE TYPES ==================== */

export interface ICourse extends Document {
    title: string;
    slug: string;
    description: string;
    field: Types.ObjectId | IField;
    level: SkillLevel;
    thumbnail?: string;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
}

/* ==================== TOPIC TYPES ==================== */

export interface ITopic extends Document {
    title: string;
    course: Types.ObjectId | ICourse;
    order: number;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

/* ==================== VIDEO TYPES ==================== */

export interface IVideo extends Document {
    title: string;
    description?: string;
    url: string;
    topic: Types.ObjectId | ITopic;
    course: Types.ObjectId | ICourse;
    uploadedBy: Types.ObjectId | IUser;
    status: Status;
    reviewedBy?: Types.ObjectId | IUser;
    reviewNote?: string;
    duration?: number;
    views?: number;
    rating?: number;
    createdAt: Date;
    updatedAt: Date;
}

/* ==================== ENROLLMENT TYPES ==================== */

export interface IEnrollmentProgress {
    completedVideos: Types.ObjectId[];
    lastWatchedVideo?: Types.ObjectId;
    completionPercentage: number;
    totalWatchTime: number;
}

export interface IEnrollment extends Document {
    user: Types.ObjectId | IUser;
    course: Types.ObjectId | ICourse;
    progress: IEnrollmentProgress;
    status: EnrollmentStatus;
    enrolledAt: Date;
    completedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

/* ==================== INTERVIEW QUESTION TYPES ==================== */

export interface IQAPair {
    question: string;
    answer: string;
    difficulty: Difficulty;
}

export interface IInterviewQuestion extends Document {
    company: string;
    role: string;
    qaPairs: IQAPair[];
    submittedBy?: Types.ObjectId | IUser;
    isAnonymous: boolean;
    status: Status;
    reviewedBy?: Types.ObjectId | IUser;
    reviewNote?: string;
    createdAt: Date;
    updatedAt: Date;
}

/* ==================== API RESPONSE TYPES ==================== */

export interface SuccessOptions<T = unknown> {
    data?: T;
    message?: string;
    statusCode?: number;
    meta?: Record<string, unknown>;
}

export interface ErrorOptions {
    error?: string;
    message?: string;
    statusCode?: number;
    details?: unknown;
}

export interface ApiResponse<T = unknown> {
    statusCode: number;
    message: string;
    data?: T;
    error?: string;
    meta?: Record<string, unknown>;
}

/* ==================== PAGINATION TYPES ==================== */

export interface PaginationOptions {
    page?: number;
    limit?: number;
    skip?: number;
}

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasMore: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: PaginationMeta;
}

/* ==================== QUERY FILTER TYPES ==================== */

export interface QueryFilter {
    [key: string]: unknown;
}

export interface QueryOptions {
    sort?: Record<string, 1 | -1>;
    select?: string[];
    populate?: string[];
    lean?: boolean;
}

/* ==================== REQUEST/JWT TYPES ==================== */

export interface JwtPayload {
    userId: string;
    role: UserRole;
    iat?: number;
    exp?: number;
}

export interface AuthRequest extends Express.Request {
    user?: {
        userId: string;
        role: UserRole;
    };
}

export interface AuthCredentials {
    email: string;
    password: string;
}

export interface RegisterData extends AuthCredentials {
    username: string;
    profile?: {
        firstName?: string;
        lastName?: string;
    };
}

/* ==================== VALIDATION TYPES ==================== */

export interface ValidationIssue {
    field: string;
    message: string;
    code?: string;
    value?: unknown;
}

export interface ValidationResult {
    isValid: boolean;
    errors?: ValidationIssue[];
}

/* ==================== SEARCH & SORT TYPES ==================== */

export interface SearchOptions {
    keyword?: string;
    filters?: Record<string, unknown>;
    sort?: Record<string, 1 | -1>;
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
    pages: number;
    hasMore: boolean;
}

/* ==================== AGGREGATE TYPES ==================== */

export interface AggregateStage {
    $match?: Record<string, unknown>;
    $group?: Record<string, unknown>;
    $sort?: Record<string, 1 | -1>;
    $limit?: number;
    $skip?: number;
    $project?: Record<string, 0 | 1>;
    $lookup?: Record<string, unknown>;
    $unwind?: string;
}

export interface StatisticsData {
    totalUsers: number;
    totalCourses: number;
    totalVideos: number;
    totalEnrollments: number;
    completionRate: number;
    averageWatchTime: number;
    activeUsersThisMonth: number;
    newUsersThisMonth: number;
    topCourses: ICourse[];
    recentActivity: unknown[];
}

/* ==================== NOTIFICATION TYPES ==================== */

export interface INotification extends Document {
    user: Types.ObjectId | IUser;
    title: string;
    message: string;
    type: 'info' | 'success' | 'error' | 'warning';
    read: boolean;
    link?: string;
    createdAt: Date;
    deletedAt?: Date;
}

/* ==================== UPLOAD TYPES ==================== */

export interface UploadMetadata {
    fileName: string;
    fileSize: number;
    mimeType: string;
    uploadedAt: Date;
    url: string;
}

export interface VideoUploadData {
    title: string;
    description?: string;
    topicId: Types.ObjectId;
    courseId: Types.ObjectId;
    videoUrl: string;
    uploadedBy: Types.ObjectId;
    thumbnail?: string;
}

/* ==================== REVIEW TYPES ==================== */

export interface IReview extends Document {
    user: Types.ObjectId | IUser;
    course: Types.ObjectId | ICourse;
    rating: number;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
}

/* ==================== ACTIVITY LOG TYPES ==================== */

export interface IActivityLog extends Document {
    user: Types.ObjectId | IUser;
    action: string;
    entityType: 'course' | 'video' | 'topic' | 'comment' | 'review';
    entityId: Types.ObjectId;
    details?: Record<string, unknown>;
    timestamp: Date;
}

/* ==================== EMAIL/NOTIFICATION TYPES ==================== */

export interface EmailPayload {
    to: string;
    subject: string;
    template: string;
    data: Record<string, unknown>;
}

export interface EmailOptions {
    from?: string;
    replyTo?: string;
    cc?: string[];
    bcc?: string[];
}

/* ==================== REDIS CACHE TYPES ==================== */

export interface CacheKey {
    prefix: string;
    identifier: string;
}

export interface CacheOptions {
    ttl?: number; // Time to live in seconds
    prefix?: string;
}

/* ==================== ERROR TYPES ==================== */

export class BaseError extends Error {
    constructor(
        public message: string,
        public statusCode: number = 500,
        public code?: string,
    ) {
        super(message);
    }
}

export class ValidationError extends BaseError {
    constructor(
        message: string,
        public details?: ValidationIssue[],
    ) {
        super(message, 400, 'VALIDATION_ERROR');
    }
}

export class NotFoundError extends BaseError {
    constructor(message: string = 'Resource not found') {
        super(message, 404, 'NOT_FOUND');
    }
}

export class AuthenticationError extends BaseError {
    constructor(message: string = 'Unauthorized') {
        super(message, 401, 'UNAUTHORIZED');
    }
}

export class AuthorizationError extends BaseError {
    constructor(message: string = 'Forbidden') {
        super(message, 403, 'FORBIDDEN');
    }
}

export class ConflictError extends BaseError {
    constructor(message: string = 'Conflict') {
        super(message, 409, 'CONFLICT');
    }
}

/* ==================== UTILITY TYPES ==================== */

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type AsyncFunction<T = void> = () => Promise<T>;
export type VoidFunction = () => void;

export interface PaginationQuery {
    page?: string | number;
    limit?: string | number;
    sort?: string;
}

export interface FilterQuery {
    [key: string]: string | number | boolean;
}

/* ==================== MIDDLEWARE TYPES ==================== */

export interface MiddlewareContext {
    user?: JwtPayload;
    startTime?: Date;
    requestId?: string;
}

/* ==================== RATE LIMIT TYPES ==================== */

export interface RateLimitConfig {
    windowMs: number; // Time window in milliseconds
    maxRequests: number; // Max requests in window
    keyGenerator?: (req: Express.Request) => string;
}

export interface RateLimitStore {
    get(key: string): Promise<number>;
    set(key: string, count: number, ttl: number): Promise<void>;
    increment(key: string, ttl: number): Promise<number>;
}
