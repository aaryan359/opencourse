import mongoose, { Schema, type Model } from 'mongoose';
import type { IInterviewQuestion } from '../types/InterviewQuestion.type';

const QAPairSchema = new Schema(
    {
        question: {
            type: String,
            required: true,
        },
        answer: {
            type: String,
            required: true,
        },
        difficulty: {
            type: String,
            enum: ['easy', 'medium', 'hard'],
            default: 'medium',
        },
    },
    { _id: false },
);

const InterviewQuestionSchema = new Schema<IInterviewQuestion>(
    {
        company: {
            type: String,
            required: true,
            trim: true,
        },

        role: {
            type: String,
            required: true,
            trim: true,
        },

        qaPairs: {
            type: [QAPairSchema],
            required: true,
            validate: (v: unknown[]) => v.length > 0,
        },

        submittedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },

        isAnonymous: {
            type: Boolean,
            default: true,
        },

        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
        },

        reviewedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },

        reviewNote: String,
    },
    { timestamps: true },
);

// Index for searching
InterviewQuestionSchema.index({ company: 1, role: 1 });
InterviewQuestionSchema.index({ status: 1 });

export const InterviewQuestion: Model<IInterviewQuestion> = mongoose.model<IInterviewQuestion>(
    'InterviewQuestion',
    InterviewQuestionSchema,
);
