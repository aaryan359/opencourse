const mongoose = require("mongoose");

const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    maxlength: [50, "Username cannot exceed 50 characters"],
  },

  email: {
    type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
  },

  password: { 
    type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"], 
  },

  expertise: {
    type: String,
    trim: true,
  },
 

  experience: { 
    type: String,
    trim: true,
  },


  portfolio: {
    type: String,
    trim: true,
  },
  

  googleId: String, // For Google OAuth


  // Videos that the user has uploaded
  videos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video', 
  }],


  // Fields that the user is associated with
  fields: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Field', 
  }],


  //Interview questions Schema
interview:[
  {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Interview'
  }
]
  

});


// JWT token generation methods
userSchema.methods.generateAccessToken = function(){
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCES_TOKEN_EXPIRY }
  );
}


userSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
    { _id: this._id },
    process.env.REFERESH_TOKEN_SECRET,
    { expiresIn: process.env.REFERESH_TOKEN_EXPIRY }
  );
}

const User = mongoose.model("User", userSchema);
module.exports = User