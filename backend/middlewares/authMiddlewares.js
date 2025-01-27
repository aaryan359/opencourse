const User = require('../models/TechSection/User');
const jwt = require('jsonwebtoken');


const verifyJWT = async (req, res, next) => {
  try {

  
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    

    // Check if token exists
    if (!token) {
      throw new Error(401, "Please log in first.");

    }


    let decodedToken;

    // Verify the token and extract the payload
    try {
      decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = decodedToken;

    } catch (error) {
      throw new Error(401, "Invalid or expired token.");
    }

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

   
    if (!user) {
      throw new Error(401, "User not found. Please log in again.");

    }

    
    req.user = user;

    // Move to the next middleware
    next();
  } catch (error) {
    
    // Handle any other errors (like DB errors)
    return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
  }
}

module.exports = {verifyJWT};