import mongoose, { Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import type { IUser } from '../types/User.type.js';

const UserSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },

        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            index: true,
        },

        password: {
            type: String,
            required: true,
            select: false, // Never returned in normal queries
        },

        // Roles & contributor lifecycle

        /**
         * student    – default for every new sign-up; can browse & watch freely
         * contributor – approved contributor; can upload videos & submit Q&A
         * admin      – full platform management access
         *
         * NOTE: There is no separate Admin model.
         *       The first admin is seeded; subsequent admins are promoted
         *       by an existing admin via PATCH /admin/users/:id/role.
         */

        role: {
            type: String,
            enum: ['student', 'contributor', 'admin'],
            default: 'student',
        },

        /**
         * Tracks where a student stands in the contributor-application flow.
         *   none     – never applied (default for new students)
         *   pending  – has applied, waiting for admin review
         *   approved – admin approved; role will be set to "contributor"
         *   rejected – admin rejected; student may re-apply
         */
        contributorStatus: {
            type: String,
            enum: ['none', 'pending', 'approved', 'rejected'],
            default: 'none',
        },

        // Public profile
        profile: {
            firstName: { type: String, trim: true },
            lastName: { type: String, trim: true },
            avatar: {
                type: String,
                default: 'https://i.pravatar.cc/100',
            },
            bio: { type: String, trim: true, maxlength: 500 },
            title: { type: String, trim: true, default: 'Learner' },
            skills: [{ type: String, trim: true }],
        },

        // / activity stats
        stats: {
            uploadedVideos: { type: Number, default: 0, min: 0 },
            totalVideosWatched: { type: Number, default: 0, min: 0 },
            totalWatchTime: { type: Number, default: 0, min: 0 }, // seconds
            level: { type: Number, default: 1, min: 1 },
            xp: { type: Number, default: 0, min: 0 },
        },
    },
    {
        timestamps: true,
        // Strip any extra keys sent from the client
        strict: true,
    },
);

// Compound index useful for the admin "list by role" query
UserSchema.index({ role: 1, createdAt: -1 });

// Hash the password whenever it is set or changed
UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password as string, 12);
});

UserSchema.methods.comparePassword = async function (candidate: string) {
    return bcrypt.compare(candidate, this.password);
};

export const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
