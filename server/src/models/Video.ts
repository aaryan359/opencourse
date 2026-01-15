import mongoose, { Schema, Document, Model } from "mongoose";
import type { IVideo } from "../types/Video.type.js";



const VideoSchema = new Schema<IVideo>(
    {
        title: { type: String, required: true },
        description: String,
        url: { type: String, required: true },

        topic: { type: Schema.Types.ObjectId, ref: "Topic", required: true },
        course: { type: Schema.Types.ObjectId, ref: "Course", required: true },

        uploadedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },

        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },

        reviewedBy: { type: Schema.Types.ObjectId, ref: "User" },
        reviewNote: String,
    },
    { timestamps: true }
);

export const Video: Model<IVideo> = mongoose.model<IVideo>("Video", VideoSchema);
