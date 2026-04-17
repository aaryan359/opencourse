import mongoose, { Schema, Model } from 'mongoose';
import type { IContributorApplication } from '../types/ContributorApplication.type.js';

const ContributorApplicationSchema = new Schema<IContributorApplication>(
    {
        /* ── Who is applying ─────────────────────────────────────── */
        applicant: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        /* ── Application body ────────────────────────────────────── */

        /**
         * Required free-text: the applicant explains their background
         * and what they plan to contribute.
         */
        motivation: {
            type: String,
            required: true,
            trim: true,
            minlength: [50, 'Motivation must be at least 50 characters'],
            maxlength: [2000, 'Motivation must be at most 2000 characters'],
        },

        /** Optional links (GitHub, portfolio, LinkedIn, etc.) */
        portfolioLinks: [{ type: String, trim: true }],

        /** Topic areas the applicant intends to contribute to */
        intendedTopics: [{ type: String, trim: true }],

        /* ── Admin review ────────────────────────────────────────── */

        /**
         * Status lifecycle:
         *   pending → approved  (role set to "contributor", contributorStatus = "approved")
         *   pending → rejected  (user notified with reviewNote, may reapply)
         */
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
        },

        reviewedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },

        /** Reason shown to the applicant when their application is rejected */
        reviewNote: {
            type: String,
            trim: true,
        },

        reviewedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    },
);

/* ── Indexes ─────────────────────────────────────────────────── */

// Prevent a user from having multiple pending applications at the same time.
// A new application can only be created once the previous one is resolved.
ContributorApplicationSchema.index(
    { applicant: 1, status: 1 },
    {
        unique: true,
        partialFilterExpression: { status: 'pending' },
        name: 'unique_pending_per_applicant',
    },
);

// Fast lookup for "show me all pending applications" (admin queue)
ContributorApplicationSchema.index({ status: 1, createdAt: 1 });

export const ContributorApplication: Model<IContributorApplication> =
    mongoose.model<IContributorApplication>('ContributorApplication', ContributorApplicationSchema);
