import type { Document } from 'mongoose';

/* ─────────────────────────────────────────────
   Sub-documents
───────────────────────────────────────────── */

export interface IUserProfile {
    firstName?: string;
    lastName?: string;
    avatar?: string;
    bio?: string;
    title?: string;
    skills?: string[];
}

export interface IUserStats {
    /** Total videos the user has uploaded as a contributor */
    uploadedVideos: number;
    /** Total videos this user has watched (as a learner) */
    totalVideosWatched: number;
    /** Cumulative watch time in seconds */
    totalWatchTime: number;
    /** Gamification level */
    level: number;
    /** Gamification experience points */
    xp: number;
}

/* ─────────────────────────────────────────────
   Contributor application state
   pending  → awaiting admin decision
   approved → user is now a contributor
   rejected → application was denied
───────────────────────────────────────────── */
export type ContributorStatus = 'none' | 'pending' | 'approved' | 'rejected';

/* ─────────────────────────────────────────────
   Root document
───────────────────────────────────────────── */
export interface IUser extends Document {
    email: string;
    password: string;
    username: string;
    role: 'student' | 'contributor' | 'admin';

    /**
     * Tracks the contributor-application lifecycle.
     * Only relevant for users with role === "student" who have applied,
     * or users who have been promoted to "contributor".
     */
    contributorStatus: ContributorStatus;

    profile: IUserProfile;
    stats: IUserStats;

    comparePassword(candidate: string): Promise<boolean>;
}
