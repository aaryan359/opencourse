// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Authentication
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  
  // Profile Information
  profile: {
    firstName: String,
    lastName: String,
    avatar: {
      type: String,
      default: 'https://i.pravatar.cc/100',
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    title: {
      type: String,
      default: 'Contributor',
    },
    skills: [{
      type: String,
      lowercase: true,
    }],
    expertise: [{
      name: String,
      level: {
        type: Number,
        min: 0,
        max: 100,
      },
    }],
    socialLinks: {
      github: String,
      twitter: String,
      linkedin: String,
      website: String,
    },
  },
  
  // Learning Stats
  stats: {
    coursesEnrolled: {
      type: Number,
      default: 0,
    },
    videosWatched: {
      type: Number,
      default: 0,
    },
    uploadedVideos: {
      type: Number,
      default: 0,
    },
    streak: {
      current: {
        type: Number,
        default: 0,
      },
      longest: {
        type: Number,
        default: 0,
      },
      lastActiveDate: Date,
    },
    totalWatchTime: {
      type: Number, // in minutes
      default: 0,
    },
    level: {
      type: Number,
      default: 1,
    },
    xp: {
      type: Number,
      default: 0,
    },
    rankPercentile: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
  },
  
  // Progress Tracking
  progress: {
    frontend: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    backend: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    devops: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
  },
  
  // Weekly Progress
  weeklyProgress: [{
    weekStart: Date,
    frontend: Number,
    backend: Number,
    devops: Number,
    videosWatched: Number,
    watchTime: Number,
  }],
  
  // Subscriptions & Enrollments
  enrolledCourses: [{
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    lastAccessed: Date,
    completed: {
      type: Boolean,
      default: false,
    },
  }],
  
  // Bookmarks
  bookmarks: [{
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
    },
    timestamp: Number, // bookmark position in seconds
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  
  // Notifications
  notifications: [{
    type: {
      type: String,
      enum: ['achievement', 'progress', 'social', 'system', 'reminder'],
    },
    title: String,
    message: String,
    read: {
      type: Boolean,
      default: false,
    },
    data: mongoose.Schema.Types.Mixed,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  
  // Settings
  settings: {
    emailNotifications: {
      type: Boolean,
      default: true,
    },
    darkMode: {
      type: Boolean,
      default: true,
    },
    autoPlay: {
      type: Boolean,
      default: true,
    },
    playbackSpeed: {
      type: Number,
      default: 1,
      min: 0.5,
      max: 2,
    },
    captionLanguage: {
      type: String,
      default: 'en',
    },
  },
  
  // Metadata
  role: {
    type: String,
    enum: ['user', 'instructor', 'admin'],
    default: 'user',
  },
  status: {
    type: String,
    enum: ['active', 'suspended', 'deactivated'],
    default: 'active',
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  lastLogin: Date,
  loginCount: {
    type: Number,
    default: 0,
  },
  
  // Timestamps
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

// Indexes for performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ 'stats.level': -1 });
userSchema.index({ 'stats.xp': -1 });
userSchema.index({ 'createdAt': -1 });

// Password hashing middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.profile.firstName || ''} ${this.profile.lastName || ''}`.trim() || this.username;
});

// Update streak method
userSchema.methods.updateStreak = function() {
  const today = new Date().toDateString();
  const lastActive = this.stats.streak.lastActiveDate 
    ? new Date(this.stats.streak.lastActiveDate).toDateString()
    : null;
  
  if (lastActive !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();
    
    if (lastActive === yesterdayStr) {
      // Consecutive day
      this.stats.streak.current += 1;
    } else {
      // Streak broken
      this.stats.streak.current = 1;
    }
    
    if (this.stats.streak.current > this.stats.streak.longest) {
      this.stats.streak.longest = this.stats.streak.current;
    }
    
    this.stats.streak.lastActiveDate = new Date();
    return this.stats.streak.current;
  }
  return this.stats.streak.current;
};

module.exports = mongoose.model('User', userSchema);