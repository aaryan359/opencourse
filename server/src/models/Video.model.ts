// models/Video.js
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  // Basic Information
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
  description: String,
  shortDescription: {
    type: String,
    maxlength: 150,
  },
  
  // Media
  videoUrl: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  duration: {
    type: Number, // in seconds
    required: true,
  },
  
  // Metadata
  type: {
    type: String,
    enum: ['tutorial', 'lecture', 'project', 'interview', 'documentary', 'quick-tip'],
    default: 'tutorial',
  },
  category: {
    type: String,
    enum: ['frontend', 'backend', 'devops', 'fullstack', 'mobile', 'datascience', 'ai-ml', 'design'],
  },
  tags: [String],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
  },
  
  // Course Relationship (if part of a course)
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  },
  sectionId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  
  // Author/Uploader
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  author: {
    name: String,
    avatar: String,
    bio: String,
  },
  
  // Content
  chapters: [{
    title: String,
    timestamp: Number, // in seconds
  }],
  resources: [{
    title: String,
    url: String,
    type: String,
    description: String,
  }],
  codeSnippets: [{
    language: String,
    code: String,
    title: String,
    description: String,
  }],
  captions: [{
    language: String,
    srtFile: String,
    vttFile: String,
  }],
  
  // Stats
  stats: {
    views: {
      type: Number,
      default: 0,
    },
    watchTime: {
      type: Number, // total watch time in seconds
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    shares: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    bookmarks: {
      type: Number,
      default: 0,
    },
    averageCompletion: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
  },
  
  // User Engagement (for analytics)
  engagement: {
    averageWatchTime: Number,
    dropOffPoints: [{
      timestamp: Number,
      percentage: Number,
    }],
    retentionRate: Number,
  },
  
  // Pricing
  accessType: {
    type: String,
    enum: ['free', 'premium', 'subscription'],
    default: 'free',
  },
  
  // Metadata
  status: {
    type: String,
    enum: ['processing', 'published', 'draft', 'archived'],
    default: 'processing',
  },
  visibility: {
    type: String,
    enum: ['public', 'private', 'unlisted'],
    default: 'public',
  },
  language: {
    type: String,
    default: 'en',
  },
  
  // Processing Info
  processing: {
    status: String,
    progress: Number,
    error: String,
    formats: [{
      quality: String,
      url: String,
      size: Number,
    }],
  },
  
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
videoSchema.index({ uploadedBy: 1, createdAt: -1 });
videoSchema.index({ category: 1, difficulty: 1 });
videoSchema.index({ 'stats.views': -1 });
videoSchema.index({ 'stats.likes': -1 });
videoSchema.index({ tags: 1 });
videoSchema.index({ courseId: 1, order: 1 });

// Virtual for formatted duration
videoSchema.virtual('formattedDuration').get(function() {
  const hours = Math.floor(this.duration / 3600);
  const minutes = Math.floor((this.duration % 3600) / 60);
  const seconds = this.duration % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

// Method to record view
videoSchema.methods.recordView = function(watchTime, userId) {
  this.stats.views += 1;
  this.stats.watchTime += watchTime || 0;
  
  // Update average completion
  if (watchTime && this.duration) {
    const completion = Math.min(100, Math.round((watchTime / this.duration) * 100));
    const currentAvg = this.stats.averageCompletion || 0;
    const totalViews = this.stats.views;
    this.stats.averageCompletion = ((currentAvg * (totalViews - 1)) + completion) / totalViews;
  }
  
  return this.save();
};

module.exports = mongoose.model('Video', videoSchema);