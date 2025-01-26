const Field = require('../../models/TechSection/Field');
const SubTopic = require('../../models/TechSection/Topics');
const Video = require('../../models/TechSection/Video');
const User = require('../../models/TechSection/User')




const getUserVideos = async (req, res) => {
  try {
    // Get the authenticated user's ID from the request
    const userId = req.user._id;
    console.log("User ID from middleware:", userId);

    // Fetch the user and populate the 'videos' field
    const user = await User.findById(userId)
      .populate({
        path: 'videos',  // Ensure this path corresponds to the 'videos' field in the user model
        select: 'title url description createdAt',  // Include specific fields from the Video schema
      })
      .lean();  // Use .lean() if you don't need Mongoose documents, this can improve performance
      
    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the populated videos associated with the user
    return res.json({
      videos: user.videos || [],  // Handle the case when there are no videos
    });
  } catch (error) {
    console.error('Error fetching user videos:', error);
    return res.status(500).json({ error: 'Failed to fetch user videos' });
  }
};




const getFields = async (req, res) => {
  try {
       
    // const userId = req.user._id;

    // Fetch the fields without populate first
    const fields = await Field.find();

    // console.log("field is",fields)

    // Check if fields are found
    if (!fields || fields.length === 0) {
      return res.status(404).json({ error: 'No fields found' });
    }

    // Now try to populate subtopics and videos
    const populatedFields = await Field.find().populate({
      path: 'subtopic',
      populate: {
        path: 'videos',
        model: 'Video',
      }
    });

    // Return all fields with populated subtopics and videos
    res.json(populatedFields);

  }
  catch (error) {
    console.error('Error fetching fields:', error);
    res.status(500).json({ error: 'Failed to fetch fields' });
  }
};



//tested 
const addField = async (req, res) => {

  const { name } = req.body;

  const userId = req.user._id;
  console.log("User ID from middleware:", userId);


  // Validate input: check if name is provided
  if (!name || name.trim() === "") {
    return res.status(400).json({ error: 'Field name is required' });
  }


  try {
    
    // Normalize the field name (optional: lowercase or trim)
    const normalizedFieldName = name.trim();

    // Check if the field already exists
    const existingField = await Field.findOne({ name: normalizedFieldName });
    if (existingField) {
      return res.status(409).json({ error: 'Field already exists' }); // Use 409 Conflict for duplicate resource
    }

    // Create a new field
    const newField = new Field({ name: normalizedFieldName });
    await newField.save();

    res.status(201).json({
      message: 'Field successfully created',
      field: newField, // Return the created field
    });
  } catch (error) {
    console.error('Error adding field:', error);

    // Check if the error is related to validation
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Invalid input', details: error.errors });
    }

    // Handle other types of errors
    res.status(500).json({ error: 'Failed to add field' });
  }
};




//tested 
const addSubtopic = async (req, res) => {
  const { fieldId } = req.params;
  const { subtopicName } = req.body;

  // Validate input
  if (!subtopicName || subtopicName.trim() === "") {
    return res.status(400).json({ error: 'Subtopic name is required' });
  }

  try {
    // Check if the field exists
    const field = await Field.findById(fieldId);
    if (!field) {
      console.error('Field not found');
      return res.status(404).json({ error: 'Field not found' });
    }

    // Ensure the subtopic field is an array
    if (!Array.isArray(field.subtopic)) {
      field.subtopic = [];
    }

    // Create a new subtopic
    const newSubtopic = new SubTopic({ name: subtopicName.trim() });
    await newSubtopic.save();
    console.log('New Subtopic:', newSubtopic);

    // Add the new subtopic to the field's subtopics array
    field.subtopic.push(newSubtopic._id);
    await field.save();

    res.status(201).json({
      message: 'Subtopic successfully created and added to field',
      subtopic: newSubtopic,
    });
  } catch (error) {
    console.error('Error adding subtopic:', error);

    // Check if the error is related to validation
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Invalid input', details: error.errors });
    }

    // Handle other types of errors
    res.status(500).json({ error: 'Failed to add subtopic' });
  }

};





//tested
const addVideoToSubtopic = async (req, res) => {
  const { subtopicId } = req.params;
  const { title, url, description } = req.body; // Add userId to body if needed

    const userId = req.user._id;
   
  try {
    // Find the subtopic by ID and populate its videos
    const subtopic = await SubTopic.findById(subtopicId).populate('videos');

    // Get unique user IDs of those who uploaded videos
    const uniqueUserIds = [...new Set(subtopic.videos.map(video => video.userId?.toString()))];

    // If the limit of unique users is reached
    if (uniqueUserIds.length >= 5) {
      return res.status(403).json({ error: "This subtopic already has videos from 5 different users." });
    }

    // Proceed with adding the video
    const newVideo = new Video({
      title,
      url,
      description,
      userId, 
    });

    // Save the video
    await newVideo.save();

    // Add the video to the subtopic's videos list
    subtopic.videos.push(newVideo._id);
    await subtopic.save();

    // If userId is available, update the user's list of uploaded videos
    if (userId) {
      const user = await User.findById(userId);
      user.videos.push(newVideo._id);
      await user.save();
    }

    // Send success response
    res.status(200).json({ message: "Video uploaded successfully", video: newVideo });

  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).json({ error: "Failed to upload video" });
  }
};




// // Get all fields
// const getFields = async (req, res) => {
//   try {
//     const fields = await Field.find().populate('subtopic.videos'); // Populate the video details
//     res.status(200).json(fields);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch fields' });
//   }
// };


//tested
// Get videos for a specific subtopic
const getVideosBySubtopic = async (req, res) => {
  
  // console.log("backend me aa gya ")
  const { fieldId, subtopicName } = req.params;

  try {
    // Find the field and populate subtopics and videos
    const field = await Field.findById(fieldId).populate({
      path: 'subtopic', 
      populate: {
        path: 'videos', 
        model: 'Video',
      }
    });

    // Check if the field exists
    if (!field) {
      return res.status(404).json({ error: 'Field not found' });
    }

    // Find the specific subtopic by name
    const subtopic = field.subtopic.find(sub => sub.name === subtopicName);
    
    // If subtopic is not found
    if (!subtopic) {
      return res.status(404).json({ error: 'Subtopic not found' });
    }

    // If subtopic has videos, return them, else return an empty array
    const videos = subtopic.videos || [];


    console.log("video from backend ",videos);


    res.status(200).json(videos);

  } catch (error) {
    console.error('Error fetching videos for subtopic:', error);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
};




module.exports = {
  getFields,
  addField,
  addSubtopic,
  addVideoToSubtopic,
  getVideosBySubtopic,
  getUserVideos
};

