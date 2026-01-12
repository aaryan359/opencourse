import mongoose, { Schema, Document, Model } from "mongoose";
import type { ITopic } from "../types/Topic.type.js";


const TopicSchema = new Schema<ITopic>(
  {
    title: { type: String, required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Topic: Model<ITopic> = mongoose.model<ITopic>("Topic", TopicSchema);
