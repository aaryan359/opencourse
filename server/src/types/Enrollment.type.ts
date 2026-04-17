import type { Document, Types } from 'mongoose';

export interface IEnrollment extends Document {
    user: Types.ObjectId;
    course: Types.ObjectId;
    progress: {
        completedVideos: Types.ObjectId[];
        lastWatchedVideo?: Types.ObjectId;
        completionPercentage: number;
        totalWatchTime: number;
    };
    status: 'active' | 'completed' | 'dropped';
    enrolledAt: Date;
    completedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
