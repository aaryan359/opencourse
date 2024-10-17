const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');





const router = express.Router();



// Public routes
router.post('/signup', registerUser);
router.post('/login', loginUser);


// Protected routesss
router.get('/profile', authMiddleware, getUserProfile);

module.exports = router;
