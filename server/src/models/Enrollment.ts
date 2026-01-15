import mongoose, { Schema, Model } from "mongoose";
import type { IEnrollment } from "../types/Enrollment.type.js";

const EnrollmentSchema = new Schema<IEnrollment>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    
    progress: {
      completedVideos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
      lastWatchedVideo: { type: Schema.Types.ObjectId, ref: "Video" },
      completionPercentage: { type: Number, default: 0 },
      totalWatchTime: { type: Number, default: 0 },
    },
    
    status: {
      type: String,
      enum: ["active", "completed", "dropped"],
      default: "active",
    },
    
    enrolledAt: { type: Date, default: Date.now },
    completedAt: Date,
  },
  { timestamps: true }
);

// Compound index to ensure unique enrollment per user per course
EnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

export const Enrollment: Model<IEnrollment> = mongoose.model<IEnrollment>(
  "Enrollment",
  EnrollmentSchema
);