const User = require('../../models/TechSection/User');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');



const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) throw new ApiError(404, "User not found");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};



// Register a new user
// tested api

const registerUser = async (req, res) => {

  const { username, email, password, expertise, experience, portfolio } = req.body;

  try {



    // Check if user already exists
    const existingUser = await User.findOne({ email });

    
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);



     
    // Create new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      expertise,
      experience,
      portfolio,
    });



    // Save the user to the database
    await user.save();

 

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },

       process.env.JWT_SECRET,
       
        { expiresIn: '1d' });


       
    // Send token to client
    res.status(201).json({ token });


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// tested api 
// Login a user
const loginUser = async (req, res) => {

  const { email, password } = req.body;


  
  try {
    // Find user by email
    const user = await User.findOne({ email });


    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Password dosen`t match' });
    }

   const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
   );
  
   const options = {
    httpOnly: false, // true if you don't need to access the cookie via JavaScript
    secure: false,  // Set to false for local development
    sameSite: 'Lax', // Use 'Lax' for simple cross-origin requests
    path: '/' // The cookie is available within the entire site
};
  


  console.log("options ",options);

  

  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json({
    status: 200, 
    data: {
      user,
      accessToken,
      refreshToken,
    },
    message: "User logged in successfully",
  });


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





// Get user profile (protected route)
const getUserProfile = async (req, res) => {
  try {
    // `req.user` is added by `authMiddleware`
    const user = await User.findById(req.user._id).populate('videos fields');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




// Update user profile
const updateUserProfile = async (req, res) => {
    // taking is updated input form user 

  const { username, expertise, experience, portfolio } = req.body;

  // find that if user is exxist or not 
  try {
    const user = await User.findById(req.user._id);


    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }


    // Update fields

    user.username = username || user.username;
    user.expertise = expertise || user.expertise;
    user.experience = experience || user.experience;
    user.portfolio = portfolio || user.portfolio;

    // save updated user in db
    await user.save();
    res.json(user);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





// Delete a user
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
};
