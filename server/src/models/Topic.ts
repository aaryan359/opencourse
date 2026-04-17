import mongoose, { Schema, Model } from 'mongoose';
import type { ITopic } from '../types/Topic.type.js';

const TopicSchema = new Schema<ITopic>(
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

        /**
         * The course this topic belongs to.
         * Topics are created by admins; contributors pick an existing
         * topic when they upload a video.
         */
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },

        /**
         * Display order within the course (lower = shown first).
         * Admins can reorder topics via PATCH /topics/reorder.
         */
        order: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    {
        timestamps: true,
    },
);

// Used by "list topics for a course, sorted by order"
TopicSchema.index({ course: 1, order: 1 });

export const Topic: Model<ITopic> = mongoose.model<ITopic>('Topic', TopicSchema);
