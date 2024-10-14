const express = require('express');
const { addVideo, getVideosForTopic } = require('../controllers/videoController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Routes for videos
router.post('/add', authMiddleware, addVideo);
router.get('/:topicId', getVideosForTopic);

module.exports = router;
