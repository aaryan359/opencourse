const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/TechControllers/userController');

const {verifyJWT} = require('../middlewares/authMiddlewares');







const router = express.Router();



// Public routes
router.post('/signup', registerUser);
router.post('/login', loginUser);



// Protected route
router.get('/profile', verifyJWT, getUserProfile);


module.exports = router;
