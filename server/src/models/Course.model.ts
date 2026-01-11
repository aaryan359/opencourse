// models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    // Course Information
    title: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
        maxlength: 200,
    },

    // Media
    thumbnail: {
        type: String,
        required: true,
    },
    promoVideo: String,
    previewVideo: String,

    // Category & Tags
    category: {
        type: String,
        enum: ['frontend', 'backend', 'devops', 'fullstack', 'mobile', 'datascience', 'ai-ml', 'design'],
        required: true,
    },
    subcategory: String,
    tags: [String],

    // Difficulty & Duration
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced', 'expert'],
        default: 'beginner',
    },
    duration: {
        totalHours: {
            type: Number,
            default: 0,
        },
        totalVideos: {
            type: Number,
            default: 0,
        },
    },

    // Instructors
    instructors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],

    // Curriculum
    sections: [{
        title: String,
        description: String,
        order: Number,
        videos: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video',
        }],
        resources: [{
            title: String,
            url: String,
            type: String,
        }],
    }],

    // Requirements
    prerequisites: [String],
    requirements: [String],

    // What will be learned
    learningOutcomes: [String],

    // Pricing
    pricing: {
        type: {
            type: String,
            enum: ['free', 'paid', 'subscription'],
            default: 'free',
        },
        amount: {
            type: Number,
            default: 0,
        },
        currency: {
            type: String,
            default: 'USD',
        },
        discount: {
            percentage: Number,
            expiresAt: Date,
        },
    },

    // Stats
    stats: {
        enrollments: {
            type: Number,
            default: 0,
        },
        completionRate: {
            type: Number,
            min: 0,
            max: 100,
            default: 0,
        },
        averageRating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },
        totalReviews: {
            type: Number,
            default: 0,
        },
        totalWatchTime: {
            type: Number,
            default: 0,
        },
    },

    // Reviews (embedded for fast access)
    recentReviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
        },
        comment: String,
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }],

    // Metadata
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft',
    },
    featured: {
        type: Boolean,
        default: false,
    },
    language: {
        type: String,
        default: 'en',
    },
    captions: [{
        language: String,
        srtFile: String,
    }],

    // Timestamps
    publishedAt: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

// Indexes
courseSchema.index({ category: 1, difficulty: 1 });
courseSchema.index({ 'stats.averageRating': -1 });
courseSchema.index({ 'stats.enrollments': -1 });
courseSchema.index({ featured: 1, 'stats.enrollments': -1 });
courseSchema.index({ tags: 1 });

// Virtual for full course URL
courseSchema.virtual('url').get(function () {
    return `/courses/${this.slug}`;
});

// Method to calculate duration
courseSchema.methods.calculateDuration = async function () {
    const Video = mongoose.model('Video');
    const videos = await Video.find({ _id: { $in: this.sections.flatMap(s => s.videos) } });

    const totalDuration = videos.reduce((acc, video) => acc + (video.duration || 0), 0);
    this.duration.totalHours = Math.round(totalDuration / 60 * 100) / 100;
    this.duration.totalVideos = videos.length;

    return this.duration;
};

module.exports = mongoose.model('Course', courseSchema);