import mongoose, { Schema, Model } from 'mongoose';
import type { ICourse } from '../types/Course.type.js';

const CourseSchema = new Schema<ICourse>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        thumbnail: {
            type: String,
            trim: true,
        },

        /**
         * The domain/field this course belongs to (e.g. "Web Development").
         * Created exclusively by admins via POST /fields.
         */
        field: {
            type: Schema.Types.ObjectId,
            ref: 'Field',
            required: true,
        },

        level: {
            type: String,
            enum: ['beginner', 'intermediate', 'advanced'],
            default: 'beginner',
        },

        /**
         * Only published courses are visible to learners.
         * Default: true so newly created courses are immediately browsable.
         */
        isPublished: {
            type: Boolean,
            default: true,
        },

        /**
         * The admin who created the course.
         * Contributors do NOT create courses — they only add videos to
         * existing courses/topics selected by admins.
         */
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

CourseSchema.index({ field: 1, level: 1 });
CourseSchema.index({ isPublished: 1, createdAt: -1 });

export const Course: Model<ICourse> = mongoose.model<ICourse>('Course', CourseSchema);
