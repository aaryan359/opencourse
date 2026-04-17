import type mongoose from 'mongoose';

/**
 * Status lifecycle:
 *   pending  → admin reviews → approved | rejected
 *   rejected → user can re-apply after cooldown
 */
export type ApplicationStatus = 'pending' | 'approved' | 'rejected';

export interface IContributorApplication extends Document {
    /** The user applying to become a contributor */
    applicant: mongoose.Types.ObjectId;

    /**
     * Why they want to contribute: portfolio links, experience, etc.
     * Required so admins have context when reviewing.
     */
    motivation: string;

    /** Optional portfolio / GitHub / LinkedIn links */
    portfolioLinks?: string[];

    /** Admin-level topics they plan to contribute to */
    intendedTopics?: string[];

    status: ApplicationStatus;

    /** Admin who reviewed this application */
    reviewedBy?: mongoose.Types.ObjectId;

    /** Explanation of why it was rejected (shown to the applicant) */
    reviewNote?: string;

    /** When the admin made their decision */
    reviewedAt?: Date;
}
