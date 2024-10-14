// controllers/authController.js
const User = require('../models/User');

const signup = async (req, res) => {
    // take data from user for sign up
  const { username, email, password, expertise, experience, portfolio } = req.body;

  if (
    [email, username, password].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new Error(400, "All fields are required and cannot be empty.");
  }
  // Check if user already exists
  const existedUser = await User.findOne({ username });
  if (existedUser) {
    throw new Error(409, "User already exists");
  }

  try {

    const newUser = new User({ username, email, password, expertise, experience, portfolio });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {

    console.error(err);

    res.status(500).json({ message: 'Error registering user' });
  }
};


module.exports = { signup };
