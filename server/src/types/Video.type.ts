import type mongoose from "mongoose";

export interface IVideo extends Document {
    title: string;
    description?: string;
    url: string;
    topic: mongoose.Types.ObjectId;
    course: mongoose.Types.ObjectId;
    uploadedBy: mongoose.Types.ObjectId;

    status: "pending" | "approved" | "rejected";
    reviewedBy?: mongoose.Types.ObjectId;
    reviewNote?: string;
}