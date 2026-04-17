import type { Document, Types } from 'mongoose';

export interface IQAPair {
    question: string;
    answer: string;
    difficulty: 'easy' | 'medium' | 'hard';
}

export interface IInterviewQuestion extends Document {
    company: string;
    role: string;
    qaPairs: IQAPair[];
    submittedBy?: Types.ObjectId; // null if anonymous
    isAnonymous: boolean;
    status: 'pending' | 'approved' | 'rejected';
    reviewedBy?: Types.ObjectId;
    reviewNote?: string;
    createdAt: Date;
    updatedAt: Date;
}
