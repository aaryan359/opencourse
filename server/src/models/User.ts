
import mongoose, { Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";
import type { IUser } from "../types/User.type.js";
 



const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },

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

// Hash password before save (Mongoose 9: no next callback, just async/await)
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password as string, 12);
});

UserSchema.methods.comparePassword = async function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

export const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
