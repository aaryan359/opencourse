import mongoose, { Schema, Model } from 'mongoose';
import type { IVideo } from '../types/Video.type.js';

const VideoSchema = new Schema<IVideo>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },

        url: {
            type: String,
            required: true,
            trim: true,
        },

        sourceType: {
            type: String,
            enum: ['url', 'file'],
            default: 'url',
        },

        mimeType: {
            type: String,
            trim: true,
        },

        fileSize: {
            type: Number,
            min: 0,
        },

        thumbnail: {
            type: String,
            trim: true,
        },

        /** Duration in seconds */
        duration: {
            type: Number,
            min: 0,
        },

        tags: [{ type: String, trim: true, lowercase: true }],

        /**
         * The topic this video belongs to.
         * Contributors choose an existing topic when uploading.
         */
        topic: {
            type: Schema.Types.ObjectId,
            ref: 'Topic',
            required: true,
        },

        /**
         * Denormalised for convenience — avoids extra population hops
         * when listing all videos for a course.
         */
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },

        /** The contributor who uploaded this video */
        uploadedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        /**
         * Status flow:
         *   pending  → contributor submits
         *   approved → admin approves → learners can now see this video
         *   rejected → admin rejects with a reviewNote → contributor revises & re-submits
         */
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
        },

        /** Admin who reviewed this video */
        reviewedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },

        /** Reason shown to contributor when their video is rejected */
        reviewNote: {
            type: String,
            trim: true,
        },

        /** Incremented on each unique view */
        views: {
            type: Number,
            default: 0,
            min: 0,
        },

        /** Average community rating (0–5) */
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
    },
    {
        timestamps: true,
    },
);

// Public feed: "show all approved videos in a course"
VideoSchema.index({ course: 1, status: 1, createdAt: -1 });

// Topic-level drill-down: "approved videos within a topic"
VideoSchema.index({ topic: 1, status: 1 });

// Admin queue: "all pending videos, oldest first"
VideoSchema.index({ status: 1, createdAt: 1 });

// Contributor's own uploads
VideoSchema.index({ uploadedBy: 1, createdAt: -1 });

export const Video: Model<IVideo> = mongoose.model<IVideo>('Video', VideoSchema);
