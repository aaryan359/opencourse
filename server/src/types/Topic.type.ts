import type mongoose from 'mongoose';

export interface ITopic extends Document {
    title: string;
    description?: string;
    course: mongoose.Types.ObjectId;
    /** Display order within the course */
    order: number;
}
