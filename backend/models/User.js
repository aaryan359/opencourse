// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true, // Ensure emails are unique
  },
  password: { // Corrected to 'password'
    type: String,
    required: [true, "Password is necessary"],
  },
  expertise: {
    type: String,
  },
  experience: {
    type: String,
  },
  portfolio: {
    type: String,
  },
  googleId: String, // For Google OAuth

  
  videos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video', // Reference to Video model
  }],
  fields: [{ // Corrected to 'fields' and changed to an array to hold multiple fields
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Field', // Reference to Field model
  }],
});

module.exports = mongoose.model("User", userSchema);
