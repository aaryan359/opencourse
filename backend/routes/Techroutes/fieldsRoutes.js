const express = require('express');
const { getFields, addField, addSubtopic, addVideoToSubtopic ,getVideosBySubtopic,getUserVideos} = require('../../controllers/TechControllers/fieldController');
const router = express.Router();

const { verifyJWT} = require("../../middlewares/authMiddlewares")

// Get all fields with subtopics and videos
router.get('/getfields', getFields);

// get all videos by user
router.get('/getvideos',verifyJWT, getUserVideos);

// Add a new field
router.post('/fields' , verifyJWT,addField);

// Add a new subtopic to a specific field
router.post('/fields/:fieldId/subtopics',  addSubtopic);

// Add a new video to a specific subtopic
router.post('/subtopics/:subtopicId/videos',verifyJWT,addVideoToSubtopic);


// Get all the videos of particular field with his particular topic like webde then select css and more topic and get all the videos on that topic 
// for now they can only see video but in future add user id and user name with the videos 

router.get('/fields/:fieldId/subtopic/:subtopicName/videos',getVideosBySubtopic);


module.exports = router;
