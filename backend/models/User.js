const mongoose = require("mongoose");

const jwt = require('jsonwebtoken');


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

  password: { 
    type: String,
    required: [true, "Password is necessary"], // Corrected validation
  },

  expertise: String,

  experience: String,

  portfolio: String,
  

  googleId: String, // For Google OAuth


  // Videos that the user has uploaded
  videos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video', // Reference to Video model
  }],


  // Fields that the user is associated with
  fields: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Field', // Reference to Field model
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