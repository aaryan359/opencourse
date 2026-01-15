
import mongoose, { Schema, Model, type HydratedDocument } from "mongoose";
import bcrypt from "bcryptjs";
import type { IUser } from "../types/User.type.js";



const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    username: { type: String, required: true, unique: true },

    profile: {
      firstName: String,
      lastName: String,
      avatar: { type: String, default: "https://i.pravatar.cc/100" },
      bio: String,
      title: { type: String, default: "Learner" },
      skills: [String],
    },

    stats: {
      totalCourses: { type: Number, default: 0 },
      completedCourses: { type: Number, default: 0 },
      totalVideosWatched: { type: Number, default: 0 },
      totalWatchTime: { type: Number, default: 0 },
      uploadedVideos: { type: Number, default: 0 },
      level: { type: Number, default: 1 },
      xp: { type: Number, default: 0 },
    },

    role: {
      type: String,
      enum: ["student", "instructor", "admin", "super_admin"],
      default: "student",
    },
  },
  { timestamps: true }
);


UserSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};
export const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
