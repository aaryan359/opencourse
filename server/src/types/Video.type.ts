import type mongoose from 'mongoose';

export type VideoStatus = 'pending' | 'approved' | 'rejected';

export interface IVideo extends Document {
    title: string;
    description?: string;
    url: string;
    sourceType: 'url' | 'file';
    mimeType?: string;
    fileSize?: number;

    /** Duration in seconds */
    duration?: number;

    thumbnail?: string;
    tags?: string[];

    topic: mongoose.Types.ObjectId;
    course: mongoose.Types.ObjectId;

    /** The contributor who uploaded this video */
    uploadedBy: mongoose.Types.ObjectId;

    status: VideoStatus;
    reviewedBy?: mongoose.Types.ObjectId;
    reviewNote?: string;

    /** Incremented on each view */
    views: number;

    /** Average rating 0–5 */
    rating: number;
}
