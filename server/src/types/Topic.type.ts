import type mongoose from "mongoose";

export interface ITopic extends Document {
  title: string;
  course: mongoose.Types.ObjectId;
  order: number;
}
