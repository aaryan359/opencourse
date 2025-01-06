const User = require('../models/TechSection/User');
const jwt = require('jsonwebtoken');


const verifyJWT = async (req, res, next) => {
  try {

    // Extract token from cookies or Authorization header

    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    console.log("token aa gya",token);


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

    // Find the user based on the token's payload
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

    // If no user is found, throw an error
    if (!user) {
      throw new Error(401, "User not found. Please log in again.");

    }

    // Attach the user object to the request for future middleware/functions
    req.user = user;

    // Move to the next middleware
    next();
  } catch (error) {
    // Handle any other errors (like DB errors)
    return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
  }
}

module.exports = {verifyJWT};