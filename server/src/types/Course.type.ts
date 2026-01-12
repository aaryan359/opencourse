import type mongoose from "mongoose";

export interface ICourse extends Document {
    title: string;
    slug: string;
    description: string;
    field: mongoose.Types.ObjectId;
    level: "beginner" | "intermediate" | "advanced";
    thumbnail?: string;
    isPublished: boolean;
}
