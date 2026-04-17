import type mongoose from 'mongoose';

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export interface ICourse extends Document {
    title: string;
    slug: string;
    description: string;

    /** The domain/category this course belongs to (e.g. "Web Development") */
    field: mongoose.Types.ObjectId;

    level: CourseLevel;
    thumbnail?: string;
    isPublished: boolean;

    /** Admin who created the course */
    createdBy: mongoose.Types.ObjectId;
}
