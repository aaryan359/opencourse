const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUser } = require('../../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Public routes
router.post('/signup', registerUser);  // Registration
router.post('/login', loginUser);      // Login

// Protected routes (require authentication)
router.get('/profile', authMiddleware, getUserProfile);   // Fetch user profile
router.put('/profile', authMiddleware, updateUserProfile); // Update user profile
router.delete('/profile', authMiddleware, deleteUser);     // Delete user

module.exports = router;
