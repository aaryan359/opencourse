import mongoose, { Schema, Document, Model } from "mongoose";
import type { ICourse } from "../types/Course.type.js";


const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },

    field: { type: Schema.Types.ObjectId, ref: "Field", required: true },

    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },

    thumbnail: String,
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Course: Model<ICourse> = mongoose.model<ICourse>("Course", CourseSchema);

