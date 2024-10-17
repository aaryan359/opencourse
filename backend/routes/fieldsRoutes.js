const express = require('express');
const { getFields, addField, addSubtopic, addVideoToSubtopic } = require('../controllers/fieldController');
const router = express.Router();

// Get all fields with subtopics and videos
router.get('/getfields', getFields);

// Add a new field
router.post('/fields', addField);

// Add a new subtopic to a specific field
router.post('/fields/:fieldId/subtopics', addSubtopic);

// Add a new video to a specific subtopic
router.post('/subtopics/:subtopicId/videos', addVideoToSubtopic);

module.exports = router;
